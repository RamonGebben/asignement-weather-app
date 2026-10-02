import type { WeatherCondition } from '~/weather/model';

/**
 * A background per weather condition, by day and by night, to give the page
 * the feel of the weather outside. These depict the sky, not UI, so they
 * don't change with the colour mode. Text never sits on them directly: it
 * sits on the glass panels, which hold contrast over any background (see
 * `glass.ts`).
 */
export const skies: Record<WeatherCondition, { day: string; night: string }> = {
  clear: {
    day: 'linear-gradient(to bottom, #3f86d6, #a9d3f5)',
    night: 'linear-gradient(to bottom, #070b1d, #26345e)',
  },
  'partly-cloudy': {
    day: 'linear-gradient(to bottom, #5f95cc, #c9dced)',
    night: 'linear-gradient(to bottom, #10162b, #374466)',
  },
  cloudy: {
    day: 'linear-gradient(to bottom, #8592a0, #c9cfd6)',
    night: 'linear-gradient(to bottom, #1b2028, #3c434d)',
  },
  rain: {
    day: 'linear-gradient(to bottom, #56636f, #98a3ad)',
    night: 'linear-gradient(to bottom, #12171e, #313943)',
  },
  'heavy-rain': {
    day: 'linear-gradient(to bottom, #3b4550, #737e88)',
    night: 'linear-gradient(to bottom, #0c1016, #272d35)',
  },
  storm: {
    day: 'linear-gradient(to bottom, #2a2d3a, #5b5470)',
    night: 'linear-gradient(to bottom, #09090f, #29233d)',
  },
  snow: {
    day: 'linear-gradient(to bottom, #b9c8d6, #eef3f8)',
    night: 'linear-gradient(to bottom, #252f3c, #586575)',
  },
  fog: {
    day: 'linear-gradient(to bottom, #aeb5bc, #e0e3e6)',
    night: 'linear-gradient(to bottom, #25292e, #484d53)',
  },
};

/** The background for a condition at this time of day. */
export const toSky = (condition: WeatherCondition, isDaytime: boolean) =>
  isDaytime ? skies[condition].day : skies[condition].night;
