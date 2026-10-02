import { clamp } from 'ramda';
import type { SunTimes } from '~/weather/model';

export interface GoldenHour {
  /** 0 outside it, rising to 1 at sunrise or sunset itself. */
  strength: number;
  /** Which end of the day it's nearer to. */
  phase: 'sunrise' | 'sunset';
}

/** How long before and after sunrise and sunset the light stays warm. */
const goldenMinutes = 90;

const minutesBetween = (now: Date, iso: string) =>
  Math.abs(now.getTime() - Date.parse(iso)) / 60_000;

/**
 * A naive measure of the warm, low light around sunrise and sunset: full at
 * the moment itself, fading linearly to nothing 90 minutes either side. The
 * real golden hour depends on how fast the sun climbs, which varies with
 * latitude and season. That's ignored here, because it's only used to tint
 * the background.
 *
 * @see https://en.wikipedia.org/wiki/Golden_hour_(photography)
 */
export const getGoldenHour = (
  now: Date,
  { sunrise, sunset }: SunTimes,
): GoldenHour => {
  const fromSunrise = minutesBetween(now, sunrise);
  const fromSunset = minutesBetween(now, sunset);
  const nearest = Math.min(fromSunrise, fromSunset);

  return {
    strength: clamp(0, 1, 1 - nearest / goldenMinutes),
    phase: fromSunrise <= fromSunset ? 'sunrise' : 'sunset',
  };
};
