import { groupWith, maxBy, reduce, sortBy } from 'ramda';
import { getDominantCondition } from '~/weather/condition/getDominantCondition';
import type { DailyForecast, Wind } from '~/weather/model';
import { toLocalDate } from '../toIsoString';
import type { Reading } from '../toReading';

/**
 * Readings grouped into days in the location's local time, oldest first.
 * A day's condition describes its daytime when there is any.
 */
export const toDailyForecasts = (
  readings: Array<Reading>,
  offset: number,
): Array<DailyForecast> => {
  const sorted = sortBy(({ dt }) => dt, readings);
  const days = groupWith(
    (a, b) => toLocalDate(a.dt, offset) === toLocalDate(b.dt, offset),
    sorted,
  );

  return days.map(day => toDailyForecast(day, offset));
};

const toDailyForecast = (
  // groupWith never produces an empty group.
  day: Array<Reading>,
  offset: number,
): DailyForecast => {
  const daytime = day.filter(({ isDaytime }) => isDaytime);
  const representative = daytime.length > 0 ? daytime : day;
  const condition = getDominantCondition(
    representative.map(reading => reading.condition),
  )!;
  const sample = representative.find(
    reading => reading.condition === condition,
  )!;

  return {
    date: toLocalDate(day[0]!.dt, offset),
    condition,
    description: sample.description,
    icon: sample.icon,
    temperature: {
      min: Math.min(...day.map(({ min }) => min)),
      max: Math.max(...day.map(({ max }) => max)),
    },
    precipitationProbability: Math.max(...day.map(({ pop }) => pop)),
    wind: toStrongestWind(day.map(({ wind }) => wind)),
  };
};

/** The strongest sustained wind, with the day's strongest gust. */
const toStrongestWind = (winds: Array<Wind>): Wind => {
  const strongest = reduce(
    maxBy<Wind>(({ speed }) => speed),
    winds[0]!,
    winds,
  );
  const gusts = winds.flatMap(({ gust }) => (gust === undefined ? [] : [gust]));

  return {
    speed: strongest.speed,
    direction: strongest.direction,
    ...(gusts.length === 0 ? {} : { gust: Math.max(...gusts) }),
  };
};
