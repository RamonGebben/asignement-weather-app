import { z } from 'zod';

/**
 * Raw OpenWeatherMap free-tier payloads (Current Weather 2.5, 5 day / 3 hour
 * Forecast 2.5, Geocoding 1.0). Only the fields we consume are declared;
 * unknown keys are stripped, so additions upstream never break parsing.
 */

const weatherEntrySchema = z.object({
  id: z.number().int(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const coordinatesSchema = z.object({ lat: z.number(), lon: z.number() });

const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

export const currentWeatherSchema = z.object({
  coord: coordinatesSchema,
  weather: z.array(weatherEntrySchema).min(1),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  visibility: z.number().optional(),
  wind: windSchema,
  clouds: z.object({ all: z.number() }),
  rain: z.object({ '1h': z.number().nonnegative() }).optional(),
  snow: z.object({ '1h': z.number().nonnegative() }).optional(),
  dt: z.number().int(),
  sys: z.object({ sunrise: z.number().int(), sunset: z.number().int() }),
  /** Offset from UTC in seconds. */
  timezone: z.number().int(),
});

export const forecastSlotSchema = z.object({
  dt: z.number().int(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
  weather: z.array(weatherEntrySchema).min(1),
  wind: windSchema,
  pop: z.number().min(0).max(1),
  /** `d` for daytime, `n` for night. */
  sys: z.object({ pod: z.enum(['d', 'n']) }),
});

export const forecastSchema = z.object({
  list: z.array(forecastSlotSchema),
  city: z.object({ coord: coordinatesSchema, timezone: z.number().int() }),
});

export const geocodingHitSchema = z.object({
  name: z.string(),
  local_names: z.record(z.string(), z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const geocodingSchema = z.array(geocodingHitSchema);

export type WeatherEntry = z.infer<typeof weatherEntrySchema>;
export type CurrentWeatherResponse = z.infer<typeof currentWeatherSchema>;
export type ForecastSlot = z.infer<typeof forecastSlotSchema>;
export type ForecastResponse = z.infer<typeof forecastSchema>;
export type GeocodingHit = z.infer<typeof geocodingHitSchema>;
