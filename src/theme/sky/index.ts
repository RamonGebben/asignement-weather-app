import type { WeatherCondition } from '~/weather/model';

/**
 * A background per weather condition, day and night, so the page feels like
 * the weather outside. These are the sky, not UI, so they ignore colour
 * mode - text lives on the glass panels instead, which guarantee contrast
 * over whatever's behind them (see `theme/glass`).
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

/**
 * How much of the sunrise or sunset glow shows through each condition, 0-1.
 * Clear air shows it fully; cloud, rain and fog hide most of it. Tuned by
 * eye.
 */
export const glowThroughWeather: Record<WeatherCondition, number> = {
  clear: 1,
  'partly-cloudy': 0.8,
  cloudy: 0.4,
  rain: 0.3,
  'heavy-rain': 0.2,
  storm: 0.2,
  snow: 0.4,
  fog: 0.3,
};

/** The glow's colour: peach at sunrise, orange at sunset. */
const glowColours = {
  sunrise: '255 170 140',
  sunset: '255 128 64',
} as const;

/** The glow at full strength, so the sky underneath still shows through. */
const maximumGlow = 0.65;

export interface SkyMoment {
  condition: WeatherCondition;
  isDaytime: boolean;
  /** 0-1 and which end of the day, e.g. from `getGoldenHour`. */
  goldenHour: { strength: number; phase: 'sunrise' | 'sunset' };
}

/**
 * The sky for a condition at this time of day, with a warm glow near
 * sunrise and sunset layered on top. A naive tint, not a model of the sky.
 */
export const toSky = ({ condition, isDaytime, goldenHour }: SkyMoment) => {
  const base = isDaytime ? skies[condition].day : skies[condition].night;
  const opacity =
    goldenHour.strength * glowThroughWeather[condition] * maximumGlow;
  if (opacity === 0) return base;

  const colour = glowColours[goldenHour.phase];
  const glow = `linear-gradient(to top, rgb(${colour} / ${opacity.toFixed(2)}), rgb(${colour} / 0) 70%)`;
  return `${glow}, ${base}`;
};

/**
 * The sky before there's a report to pick a real one from - muted, and not
 * borrowed from any real condition, since we don't know the weather yet.
 */
export const neutralSky = {
  day: 'linear-gradient(to bottom, #6c7d8f, #c4ccd4)',
  night: 'linear-gradient(to bottom, #171a24, #363d4a)',
};

const naiveDayHours = { start: 6, end: 20 };

/**
 * A rough day/night guess from the visitor's own clock, since the real
 * sunrise and sunset only arrive with the report.
 */
export const isNaiveDaytime = (now: Date) => {
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= naiveDayHours.start && hour < naiveDayHours.end;
};

/** The neutral sky matching that guess. */
export const getNeutralSky = (now: Date) =>
  isNaiveDaytime(now) ? neutralSky.day : neutralSky.night;
