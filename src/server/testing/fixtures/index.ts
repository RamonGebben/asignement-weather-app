/**
 * Real responses recorded from the OpenWeatherMap free tier on 2 October
 * 2026 for Amsterdam (UTC+2), unmodified apart from trimming geocoding
 * `local_names` to a few languages. Typed as `unknown` on purpose: they are
 * the untrusted input our schemas parse.
 */
import currentAmsterdamJson from './currentAmsterdam.json';
import forecastAmsterdamJson from './forecastAmsterdam.json';
import geocodingAmsterdamJson from './geocodingAmsterdam.json';
import reverseGeocodingTheHagueJson from './reverseGeocodingTheHague.json';

export const currentAmsterdam: unknown = currentAmsterdamJson;
export const forecastAmsterdam: unknown = forecastAmsterdamJson;
export const geocodingAmsterdam: unknown = geocodingAmsterdamJson;
export const reverseGeocodingTheHague: unknown = reverseGeocodingTheHagueJson;
