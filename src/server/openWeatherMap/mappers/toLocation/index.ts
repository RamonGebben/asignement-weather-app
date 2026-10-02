import type { Location } from '~/weather/model';
import type { GeocodingHit } from '../../schemas';

/** Geocoding hit to a location, preferring the English place name. */
export const toLocation = (hit: GeocodingHit): Location => ({
  name: hit.local_names?.en ?? hit.name,
  country: hit.country,
  ...(hit.state === undefined ? {} : { state: hit.state }),
  coordinates: { lat: hit.lat, lon: hit.lon },
});
