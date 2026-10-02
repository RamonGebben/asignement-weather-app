import { z } from 'zod';
import { defaultLocation } from '~/weather/defaultLocation';
import type { Location } from '~/weather/model';

export type SearchParams = Record<string, string | Array<string> | undefined>;

// An empty string would otherwise coerce to 0 - a valid coordinate.
const coordinate = (min: number, max: number) =>
  z.string().trim().min(1).transform(Number).pipe(z.number().min(min).max(max));

const text = z.string().trim().min(1).max(100);

const locationParamsSchema = z.object({
  lat: coordinate(-90, 90),
  lon: coordinate(-180, 180),
  name: text,
  // Empty when the browser position has no named place.
  country: z.string().trim().max(2),
  state: text.optional(),
});

const first = (value: string | Array<string> | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** The location in the URL, or the default when it is missing or invalid. */
export const parseLocationSearchParams = (params: SearchParams): Location => {
  const parsed = locationParamsSchema.safeParse({
    lat: first(params.lat),
    lon: first(params.lon),
    name: first(params.name),
    country: first(params.country),
    state: first(params.state),
  });

  if (!parsed.success) return defaultLocation;

  const { lat, lon, name, country, state } = parsed.data;
  return {
    name,
    country,
    ...(state === undefined ? {} : { state }),
    coordinates: { lat, lon },
  };
};

/** A location as a query string, without the leading `?`. */
export const toLocationSearchParams = ({
  name,
  country,
  state,
  coordinates,
}: Location) =>
  new URLSearchParams({
    lat: String(coordinates.lat),
    lon: String(coordinates.lon),
    name,
    country,
    ...(state === undefined ? {} : { state }),
  }).toString();
