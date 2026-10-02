import type { Location } from '~/weather/model';

/** Where the app opens when no location is chosen. */
export const defaultLocation: Location = {
  name: 'Utrecht',
  country: 'NL',
  state: 'Utrecht',
  coordinates: { lat: 52.0907, lon: 5.1214 },
};
