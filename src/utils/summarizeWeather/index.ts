import {
  formatPercentage,
  formatTemperature,
  formatWindSpeed,
} from '~/utils/formatWeather';
import type { CurrentWeather, DailyForecast } from '~/weather/model';
import { toCompassPoint } from '~/weather/wind/toCompassPoint';

/** Above this, the chance of rain is worth calling out. */
const notableRainChance = 0.3;

/**
 * A short plain-language summary for the hero, built only from data, e.g.
 * "Feels like 20°. Humidity 63%, wind 11.3 km/h from the SSW. Little
 * chance of rain today."
 */
export const summarizeWeather = (
  current: CurrentWeather,
  today: DailyForecast,
) => {
  const rain =
    today.precipitationProbability > notableRainChance
      ? `${formatPercentage(today.precipitationProbability)} chance of rain today.`
      : 'Little chance of rain today.';

  return [
    `Feels like ${formatTemperature(current.feelsLike)}.`,
    `Humidity ${current.humidity}%, wind ${formatWindSpeed(current.wind.speed)} from the ${toCompassPoint(current.wind.direction)}.`,
    rain,
  ].join(' ');
};
