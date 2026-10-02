import { uniqBy } from 'ramda';
import type { Location } from '~/weather/model';
import type { GeocodingHit } from '../../schemas';
import { toLocation } from '../toLocation';

/**
 * Geocoding hits to locations, best match first. The provider can return
 * the same place twice (e.g. a city and its municipality); keep the first.
 */
export const toLocations = (hits: Array<GeocodingHit>): Array<Location> =>
  uniqBy(
    ({ name, state, country }) => `${name}|${state ?? ''}|${country}`,
    hits.map(toLocation),
  );
