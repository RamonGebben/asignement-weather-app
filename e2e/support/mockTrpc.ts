import type { Page } from '@playwright/test';
import {
  sampleReverseLocation,
  sampleSearchResults,
  sampleWeatherReport,
} from '~/weather/samples';

type Resolver = (input: unknown) => unknown;

export interface TrpcCall {
  procedure: string;
  input: unknown;
}

const defaultResolvers: Record<string, Resolver> = {
  'weather.get': () => sampleWeatherReport,
  'location.search': () => sampleSearchResults,
  'location.reverse': () => sampleReverseLocation,
};

/**
 * Answers the browser's tRPC calls from the domain samples, so flows run
 * without the server reaching OpenWeatherMap. Handles `httpBatchLink`'s
 * batched GETs (`/api/trpc/a,b?batch=1&input={"0":…,"1":…}`) and records
 * every call for assertions.
 */
export const mockTrpc = async (
  page: Page,
  overrides: Record<string, Resolver> = {},
) => {
  const resolvers = { ...defaultResolvers, ...overrides };
  const calls: Array<TrpcCall> = [];

  await page.route('**/api/trpc/**', async route => {
    const url = new URL(route.request().url());
    const procedures = url.pathname.replace('/api/trpc/', '').split(',');
    const inputs = JSON.parse(url.searchParams.get('input') ?? '{}') as Record<
      string,
      unknown
    >;

    const results = procedures.map((procedure, index) => {
      const input = inputs[String(index)];
      calls.push({ procedure, input });
      const resolve = resolvers[procedure];
      return resolve
        ? { result: { data: resolve(input) } }
        : { error: { message: `No mock for ${procedure}`, code: -32004 } };
    });

    await route.fulfill({ json: results });
  });

  return { calls };
};
