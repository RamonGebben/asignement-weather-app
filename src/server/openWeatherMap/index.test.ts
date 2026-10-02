import { describe, expect, it } from 'vitest';
import {
  createFakeFetch,
  currentAmsterdam,
  forecastAmsterdam,
  geocodingAmsterdam,
  reverseGeocodingTheHague,
} from '~/server/testing';
import type { FakeResponse } from '~/server/testing';
import { createOpenWeatherMapClient, OpenWeatherMapError } from '.';

const apiKey = 'test-api-key';
const amsterdam = { lat: 52.37, lon: 4.89 };

const setup = (routes: Record<string, FakeResponse> = {}) => {
  const { fetch, requests } = createFakeFetch({
    '/data/2.5/weather': { body: currentAmsterdam },
    '/data/2.5/forecast': { body: forecastAmsterdam },
    '/geo/1.0/direct': { body: geocodingAmsterdam },
    '/geo/1.0/reverse': { body: reverseGeocodingTheHague },
    ...routes,
  });
  return {
    client: createOpenWeatherMapClient({ apiKey, fetch }),
    requests,
  };
};

const params = (url: URL | undefined) =>
  Object.fromEntries(url?.searchParams ?? []);

describe('createOpenWeatherMapClient', () => {
  describe('weather', () => {
    it('requests metric current weather and forecast for the location', async () => {
      const { client, requests } = setup();

      await client.weather(amsterdam);

      expect(requests.map(({ origin, pathname }) => origin + pathname)).toEqual(
        [
          'https://api.openweathermap.org/data/2.5/weather',
          'https://api.openweathermap.org/data/2.5/forecast',
        ],
      );
      requests.forEach(url =>
        expect(params(url)).toEqual({
          lat: '52.37',
          lon: '4.89',
          units: 'metric',
          appid: apiKey,
        }),
      );
    });

    it('combines both into a weather report', async () => {
      const { client } = setup();

      const report = await client.weather(amsterdam);

      expect(report.current.condition).toBe('partly-cloudy');
      expect(report.today.date).toBe('2026-10-02');
      expect(report.forecast).toHaveLength(5);
    });

    it('fails when either call fails', async () => {
      const { client } = setup({
        '/data/2.5/forecast': { status: 500, body: {} },
      });

      await expect(client.weather(amsterdam)).rejects.toMatchObject({
        kind: 'upstream',
      });
    });
  });

  describe('geocode', () => {
    it('searches by name with a limit', async () => {
      const { client, requests } = setup();

      const locations = await client.geocode('Amsterdam', 5);

      expect(params(requests[0])).toEqual({
        q: 'Amsterdam',
        limit: '5',
        appid: apiKey,
      });
      expect(locations[0]?.name).toBe('Amsterdam');
    });
  });

  describe('reverseGeocode', () => {
    it('names the place at the coordinates', async () => {
      const { client, requests } = setup();

      const location = await client.reverseGeocode({ lat: 52.08, lon: 4.31 });

      expect(params(requests[0])).toMatchObject({ limit: '1' });
      expect(location?.name).toBe('The Hague');
    });

    it('returns null where there is no named place', async () => {
      const { client } = setup({ '/geo/1.0/reverse': { body: [] } });

      expect(await client.reverseGeocode({ lat: 0, lon: -140 })).toBeNull();
    });
  });

  describe('errors', () => {
    it.each([
      [401, 'unauthorized'],
      [403, 'unauthorized'],
      [404, 'not-found'],
      [429, 'rate-limited'],
      [500, 'upstream'],
      [503, 'upstream'],
    ] as const)('maps HTTP %s to %s', async (status, kind) => {
      const { client } = setup({
        '/data/2.5/weather': { status, body: { message: 'nope' } },
      });

      await expect(client.weather(amsterdam)).rejects.toMatchObject({
        name: 'OpenWeatherMapError',
        kind,
      });
    });

    it('reports a network failure as upstream', async () => {
      const { client } = setup({
        '/geo/1.0/direct': { error: new TypeError('fetch failed') },
      });

      await expect(client.geocode('Amsterdam', 5)).rejects.toMatchObject({
        kind: 'upstream',
        message: 'Weather provider could not be reached',
      });
    });

    it('reports a timeout as upstream', async () => {
      const { client } = setup({
        '/data/2.5/weather': {
          error: new DOMException('timed out', 'TimeoutError'),
        },
      });

      await expect(client.weather(amsterdam)).rejects.toMatchObject({
        kind: 'upstream',
        message: 'Weather provider timed out after 8000ms',
      });
    });

    it('rejects a malformed payload as an invalid response', async () => {
      const { client } = setup({
        '/data/2.5/forecast': { body: { list: 'nothing' } },
      });

      await expect(client.weather(amsterdam)).rejects.toMatchObject({
        kind: 'invalid-response',
      });
    });

    it('never puts the API key in an error message', async () => {
      const { client } = setup({
        '/data/2.5/weather': { status: 401, body: {} },
      });

      const error: unknown = await client.weather(amsterdam).catch(e => e);

      expect(error).toBeInstanceOf(OpenWeatherMapError);
      expect((error as Error).message).not.toContain(apiKey);
    });
  });
});
