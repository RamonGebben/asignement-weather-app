import { TRPCError } from '@trpc/server';
import { describe, expect, it } from 'vitest';
import { createOpenWeatherMapClient } from '~/server/openWeatherMap';
import {
  createFakeFetch,
  currentAmsterdam,
  forecastAmsterdam,
  geocodingAmsterdam,
  reverseGeocodingTheHague,
} from '~/server/testing';
import type { FakeResponse } from '~/server/testing';
import { createCaller } from '.';

const apiKey = 'secret-test-key';

const setup = (routes: Record<string, FakeResponse> = {}) => {
  const { fetch, requests } = createFakeFetch({
    '/data/2.5/weather': { body: currentAmsterdam },
    '/data/2.5/forecast': { body: forecastAmsterdam },
    '/geo/1.0/direct': { body: geocodingAmsterdam },
    '/geo/1.0/reverse': { body: reverseGeocodingTheHague },
    ...routes,
  });
  const caller = createCaller({
    openWeatherMap: createOpenWeatherMapClient({ apiKey, fetch }),
  });
  return { caller, requests };
};

const rejection = (promise: Promise<unknown>) =>
  promise.then(
    () => {
      throw new Error('Expected the call to reject');
    },
    (error: unknown) => error as TRPCError,
  );

describe('appRouter', () => {
  describe('weather.get', () => {
    it('returns the weather report for a location', async () => {
      const { caller } = setup();

      const report = await caller.weather.get({ lat: 52.37, lon: 4.89 });

      expect(report.timezoneOffset).toBe(7200);
      expect(report.current).toMatchObject({
        condition: 'partly-cloudy',
        temperature: 20.34,
        humidity: 62,
        wind: { speed: 4.02, gust: 5.36, direction: 183 },
        sun: {
          sunrise: '2026-10-02T05:42:42.000Z',
          sunset: '2026-10-02T17:16:50.000Z',
        },
      });
      expect(report.today.temperature).toEqual({ min: 12.93, max: 20.34 });
      expect(report.forecast).toHaveLength(5);
    });

    it('rounds coordinates before they go upstream', async () => {
      const { caller, requests } = setup();

      await caller.weather.get({ lat: 52.3727598, lon: 4.8936041 });

      requests.forEach(url => {
        expect(url.searchParams.get('lat')).toBe('52.37');
        expect(url.searchParams.get('lon')).toBe('4.89');
      });
    });

    it('rejects invalid coordinates without calling the provider', async () => {
      const { caller, requests } = setup();

      const error = await rejection(caller.weather.get({ lat: 91, lon: 0 }));

      expect(error.code).toBe('BAD_REQUEST');
      expect(requests).toHaveLength(0);
    });

    it.each([
      [401, 'INTERNAL_SERVER_ERROR', 'The weather service is misconfigured'],
      [404, 'NOT_FOUND', 'No weather data for this location'],
      [
        429,
        'TOO_MANY_REQUESTS',
        'Too many weather requests, try again shortly',
      ],
      [500, 'BAD_GATEWAY', 'The weather service is unavailable'],
    ] as const)('maps a provider %s to %s', async (status, code, message) => {
      const { caller } = setup({
        '/data/2.5/weather': { status, body: { cod: status } },
      });

      const error = await rejection(caller.weather.get({ lat: 1, lon: 1 }));

      expect(error).toBeInstanceOf(TRPCError);
      expect(error.code).toBe(code);
      expect(error.message).toBe(message);
    });

    it('maps a malformed provider payload to BAD_GATEWAY', async () => {
      const { caller } = setup({
        '/data/2.5/forecast': { body: { list: null } },
      });

      const error = await rejection(caller.weather.get({ lat: 1, lon: 1 }));

      expect(error.code).toBe('BAD_GATEWAY');
    });

    it('never exposes the API key in an error', async () => {
      const { caller } = setup({
        '/data/2.5/weather': { status: 401, body: {} },
      });

      const error = await rejection(caller.weather.get({ lat: 1, lon: 1 }));

      expect(error.message).not.toContain(apiKey);
      expect(error.cause?.message).not.toContain(apiKey);
    });
  });

  describe('location.search', () => {
    it('returns matching locations without duplicates', async () => {
      const { caller, requests } = setup();

      const locations = await caller.location.search({ query: ' Amsterdam ' });

      expect(requests[0]?.searchParams.get('q')).toBe('Amsterdam');
      expect(requests[0]?.searchParams.get('limit')).toBe('5');
      expect(locations).toHaveLength(4);
      expect(locations[0]).toEqual({
        name: 'Amsterdam',
        country: 'NL',
        state: 'North Holland',
        coordinates: { lat: 52.3727598, lon: 4.8936041 },
      });
    });

    it('returns an empty list when nothing matches', async () => {
      const { caller } = setup({ '/geo/1.0/direct': { body: [] } });

      expect(await caller.location.search({ query: 'Qwxyz' })).toEqual([]);
    });

    it('rejects a too-short query', async () => {
      const { caller, requests } = setup();

      const error = await rejection(caller.location.search({ query: 'A' }));

      expect(error.code).toBe('BAD_REQUEST');
      expect(requests).toHaveLength(0);
    });
  });

  describe('location.reverse', () => {
    it('names the place at the browser position', async () => {
      const { caller, requests } = setup();

      const location = await caller.location.reverse({
        lat: 52.0799838,
        lon: 4.3113461,
      });

      expect(requests[0]?.searchParams.get('lat')).toBe('52.08');
      expect(location).toEqual({
        name: 'The Hague',
        country: 'NL',
        state: 'South Holland',
        coordinates: { lat: 52.0799838, lon: 4.3113461 },
      });
    });

    it('returns null where there is no named place', async () => {
      const { caller } = setup({ '/geo/1.0/reverse': { body: [] } });

      expect(await caller.location.reverse({ lat: 0, lon: -140 })).toBeNull();
    });
  });
});
