import type { OpenWeatherMapClient } from '~/server/openWeatherMap';
import { createOpenWeatherMapClient } from '~/server/openWeatherMap';
import { getServerEnv } from '~/server/env';

/**
 * Everything a procedure may depend on. Injected rather than imported, so
 * tests can hand procedures a provider client backed by a fake `fetch`.
 */
export interface Context {
  openWeatherMap: OpenWeatherMapClient;
}

export type CreateContext = () => Context | Promise<Context>;

/** The production context: the real provider over the network. */
export const createContext: CreateContext = () => ({
  openWeatherMap: createOpenWeatherMapClient({
    apiKey: getServerEnv().OPENWEATHERMAP_API_KEY,
    fetch: globalThis.fetch,
  }),
});
