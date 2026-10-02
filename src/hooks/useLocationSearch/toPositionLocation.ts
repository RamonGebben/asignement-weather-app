import type { Coordinates, Location } from '~/weather/model';

/**
 * The browser's position as a location: the user's own coordinates (not the
 * named place's centre), named after the nearest place when there is one.
 */
export const toPositionLocation = (
  coordinates: Coordinates,
  place: Location | null,
): Location =>
  place
    ? { ...place, coordinates }
    : { name: 'Your location', country: '', coordinates };
