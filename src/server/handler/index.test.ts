import { createTRPCClient, httpBatchLink, TRPCClientError } from '@trpc/client';
import { describe, expect, it } from 'vitest';
import { createOpenWeatherMapClient } from '~/server/openWeatherMap';
import type { AppRouter } from '~/server/routers';
import {
  createFakeFetch,
  currentAmsterdam,
  forecastAmsterdam,
  geocodingAmsterdam,
  reverseGeocodingTheHague,
} from '~/server/testing';
import type { FakeResponse } from '~/server/testing';
import { createTrpcHandler } from '.';

const origin = 'http://localhost:3000';

/**
 * The full HTTP path a browser takes: a typed tRPC client serializes and
 * batches the call, the handler parses the Request and returns a Response.
 * Only the provider at the far end is faked.
 */
const setup = (routes: Record<string, FakeResponse> = {}) => {
  const provider = createFakeFetch({
    '/data/2.5/weather': { body: currentAmsterdam },
    '/data/2.5/forecast': { body: forecastAmsterdam },
    '/geo/1.0/direct': { body: geocodingAmsterdam },
    '/geo/1.0/reverse': { body: reverseGeocodingTheHague },
    ...routes,
  });
  const handler = createTrpcHandler(() => ({
    openWeatherMap: createOpenWeatherMapClient({
      apiKey: 'test-key',
      fetch: provider.fetch,
    }),
  }));
  const httpRequests: Array<Request> = [];
  const client = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${origin}/api/trpc`,
        fetch: async (input, init) => {
          const request = new Request(input, init);
          httpRequests.push(request);
          return handler(request);
        },
      }),
    ],
  });
  return { client, handler, httpRequests, providerRequests: provider.requests };
};

describe('createTrpcHandler', () => {
  it('serves a typed weather report over HTTP', async () => {
    const { client } = setup();

    const report = await client.weather.get.query({ lat: 52.37, lon: 4.89 });

    expect(report.current.condition).toBe('partly-cloudy');
    expect(report.today.date).toBe('2026-10-02');
    expect(report.forecast.map(({ condition }) => condition)).toEqual([
      'cloudy',
      'rain',
      'cloudy',
      'rain',
      'cloudy',
    ]);
  });

  it('batches concurrent queries into one HTTP request', async () => {
    const { client, httpRequests, providerRequests } = setup();

    const [report, locations, here] = await Promise.all([
      client.weather.get.query({ lat: 52.37, lon: 4.89 }),
      client.location.search.query({ query: 'Amsterdam' }),
      client.location.reverse.query({ lat: 52.08, lon: 4.31 }),
    ]);

    expect(httpRequests).toHaveLength(1);
    // weather.get needs both current weather and the forecast.
    expect(providerRequests).toHaveLength(4);
    expect(report.timezoneOffset).toBe(7200);
    expect(locations).toHaveLength(4);
    expect(here?.name).toBe('The Hague');
  });

  it('surfaces provider failures as typed client errors', async () => {
    const { client } = setup({
      '/data/2.5/weather': { status: 429, body: {} },
    });

    const error = await client.weather.get
      .query({ lat: 1, lon: 1 })
      .catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(TRPCClientError);
    expect((error as TRPCClientError<AppRouter>).data?.code).toBe(
      'TOO_MANY_REQUESTS',
    );
    expect((error as TRPCClientError<AppRouter>).data?.httpStatus).toBe(429);
  });

  it.each([
    [{ lat: 100, lon: 0 }, 400],
    [{ lat: 52.37, lon: 4.89 }, 200],
  ])('answers GET weather.get with %o using HTTP %s', async (input, status) => {
    const { handler } = setup();
    const url = new URL(`${origin}/api/trpc/weather.get`);
    url.searchParams.set('input', JSON.stringify(input));

    const response = await handler(new Request(url));

    expect(response.status).toBe(status);
  });

  it('answers 404 for an unknown procedure', async () => {
    const { handler } = setup();

    const response = await handler(
      new Request(`${origin}/api/trpc/weather.nope`),
    );

    expect(response.status).toBe(404);
  });
});
