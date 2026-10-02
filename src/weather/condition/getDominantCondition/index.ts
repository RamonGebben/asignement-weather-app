import { countBy, descend, identity, sortWith, uniq } from 'ramda';
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
 * The condition that best describes a period: the most frequent one (the
 * statistical mode), with ties going to the more severe condition.
 *
 * @see https://en.wikipedia.org/wiki/Mode_(statistics)
 */
export const getDominantCondition = (
  conditions: Array<WeatherCondition>,
): WeatherCondition | undefined => {
  const counts = countBy(identity, conditions);
  const frequency = (condition: WeatherCondition) => counts[condition] ?? 0;
  const severityOf = (condition: WeatherCondition) =>
    severity.indexOf(condition);

  const [dominant] = sortWith(
    [descend(frequency), descend(severityOf)],
    uniq(conditions),
  );

  return dominant;
};
