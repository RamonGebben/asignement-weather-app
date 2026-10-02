import { z } from 'zod';

/**
 * Two decimals is roughly 1 km - plenty for weather, kinder to caches and
 * privacy. A degree of latitude is about 111 km, so 0.01° is about 1.1 km.
 *
 * @see https://en.wikipedia.org/wiki/Decimal_degrees#Precision
 */
const roundCoordinate = (value: number) => Math.round(value * 100) / 100;

export const coordinatesInput = z
  .object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
  })
  .transform(({ lat, lon }) => ({
    lat: roundCoordinate(lat),
    lon: roundCoordinate(lon),
  }));

export const locationSearchInput = z.object({
  query: z.string().trim().min(2).max(100),
  limit: z.number().int().min(1).max(5).default(5),
});
