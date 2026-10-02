/**
 * Test support for the server layer: recorded provider responses and a
 * fake `fetch`. Only test files import this module.
 */
export {
  currentAmsterdam,
  forecastAmsterdam,
  geocodingAmsterdam,
  reverseGeocodingTheHague,
} from './fixtures';
export { createFakeFetch } from './createFakeFetch';
export type { FakeResponse } from './createFakeFetch';
