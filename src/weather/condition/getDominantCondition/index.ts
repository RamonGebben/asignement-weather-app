import { countBy, identity, toPairs } from 'ramda';
import type { WeatherCondition } from '~/weather/model';

/** Least to most severe - breaks ties towards the weather worth knowing about. */
const severity: Array<WeatherCondition> = [
  'clear',
  'partly-cloudy',
  'cloudy',
  'fog',
  'rain',
  'snow',
  'heavy-rain',
  'storm',
];

/**
 * The condition that best describes a period: the most frequent one, with
 * ties going to the more severe condition.
 */
export const getDominantCondition = (
  conditions: Array<WeatherCondition>,
): WeatherCondition | undefined => {
  const counts = toPairs(countBy(identity, conditions)) as Array<
    [WeatherCondition, number]
  >;

  return counts.reduce<[WeatherCondition, number] | undefined>(
    (best, entry) =>
      !best ||
      entry[1] > best[1] ||
      (entry[1] === best[1] &&
        severity.indexOf(entry[0]) > severity.indexOf(best[0]))
        ? entry
        : best,
    undefined,
  )?.[0];
};
