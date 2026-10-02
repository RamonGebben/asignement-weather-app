import { clamp } from 'ramda';
import type { SunTimes } from '~/weather/model';

export interface SunArcPosition {
  /** 0 at sunrise, 1 at sunset; clamped outside daylight. */
  progress: number;
  isDaytime: boolean;
}

/**
 * Where the sun sits on its daily arc. Polar day/night (sunrise equal to
 * sunset, as the provider reports it) has no arc, so it reports night.
 *
 * @see https://en.wikipedia.org/wiki/Polar_night
 * @see https://en.wikipedia.org/wiki/Midnight_sun
 */
export const getSunArcPosition = (
  now: Date,
  { sunrise, sunset }: SunTimes,
): SunArcPosition => {
  const start = Date.parse(sunrise);
  const end = Date.parse(sunset);
  const length = end - start;

  if (length <= 0) return { progress: 0, isDaytime: false };

  const elapsed = now.getTime() - start;

  return {
    progress: clamp(0, 1, elapsed / length),
    isDaytime: elapsed >= 0 && elapsed <= length,
  };
};
