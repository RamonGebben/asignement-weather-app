import type { z } from 'zod';
import type { Coordinates, Location, WeatherReport } from '~/weather/model';
import { toLocation } from './mappers/toLocation';
import { toLocations } from './mappers/toLocations';
import { toWeatherReport } from './mappers/toWeatherReport';
import {
  currentWeatherSchema,
  forecastSchema,
  geocodingSchema,
} from './schemas';

export type OpenWeatherMapErrorKind =
  | 'unauthorized'
  | 'not-found'
  | 'rate-limited'
  | 'upstream'
  | 'invalid-response';

export interface OpenWeatherMapClient {
  /** Current conditions plus the daily forecast - two upstream calls. */
  weather: (coordinates: Coordinates) => Promise<WeatherReport>;
  geocode: (query: string, limit: number) => Promise<Array<Location>>;
  reverseGeocode: (coordinates: Coordinates) => Promise<Location | null>;
}

export interface OpenWeatherMapClientOptions {
  apiKey: string;
  fetch: typeof globalThis.fetch;
  baseUrl?: string;
  timeoutMs?: number;
}

export const defaultBaseUrl = 'https://api.openweathermap.org';

export const createOpenWeatherMapClient = ({
  apiKey,
  fetch,
  baseUrl = defaultBaseUrl,
  timeoutMs = 8000,
}: OpenWeatherMapClientOptions): OpenWeatherMapClient => {
  const request = async <Schema extends z.ZodType>(
    path: string,
    params: Record<string, string | number>,
    schema: Schema,
  ): Promise<z.output<Schema>> => {
    const url = new URL(path, baseUrl);
    Object.entries({ ...params, appid: apiKey }).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { accept: 'application/json' },
    }).catch((error: unknown) => {
      throw new OpenWeatherMapError(
        'upstream',
        isTimeout(error)
          ? `Weather provider timed out after ${timeoutMs}ms`
          : 'Weather provider could not be reached',
      );
    });

    if (!response.ok) throw toStatusError(response.status, path);

    const body: unknown = await response.json().catch(() => undefined);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      throw new OpenWeatherMapError(
        'invalid-response',
        `Weather provider returned an unexpected response for ${path}`,
      );
    }

    return parsed.data;
  };

  return {
    weather: async ({ lat, lon }) => {
      const params = { lat, lon, units: 'metric' };
      const [current, forecast] = await Promise.all([
        request('/data/2.5/weather', params, currentWeatherSchema),
        request('/data/2.5/forecast', params, forecastSchema),
      ]);
      return toWeatherReport(current, forecast);
    },

    geocode: async (query, limit) =>
      toLocations(
        await request('/geo/1.0/direct', { q: query, limit }, geocodingSchema),
      ),

    reverseGeocode: async ({ lat, lon }) => {
      const [hit] = await request(
        '/geo/1.0/reverse',
        { lat, lon, limit: 1 },
        geocodingSchema,
      );
      return hit ? toLocation(hit) : null;
    },
  };
};

/** A provider failure. Its message never contains the API key or URL. */
export class OpenWeatherMapError extends Error {
  readonly kind: OpenWeatherMapErrorKind;

  constructor(kind: OpenWeatherMapErrorKind, message: string) {
    super(message);
    this.name = 'OpenWeatherMapError';
    this.kind = kind;
  }
}

const toStatusError = (status: number, path: string) => {
  if (status === 401 || status === 403)
    return new OpenWeatherMapError(
      'unauthorized',
      'Weather provider rejected the API key',
    );
  if (status === 404)
    return new OpenWeatherMapError('not-found', `No data found for ${path}`);
  if (status === 429)
    return new OpenWeatherMapError(
      'rate-limited',
      'Weather provider rate limit reached',
    );
  return new OpenWeatherMapError(
    'upstream',
    `Weather provider responded with ${status}`,
  );
};

const isTimeout = (error: unknown) =>
  error instanceof DOMException && error.name === 'TimeoutError';
