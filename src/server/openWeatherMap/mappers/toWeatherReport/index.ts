import type { WeatherReport } from '~/weather/model';
import type { CurrentWeatherResponse, ForecastResponse } from '../../schemas';
import { toCurrentWeather } from '../toCurrentWeather';
import { toDailyForecasts } from '../toDailyForecasts';
import { toLocalDate } from '../toIsoString';
import { currentToReading, slotToReading } from '../toReading';

/** Days after today included in the forecast. */
export const forecastLength = 5;

/**
 * Fewer 3-hour slots than this (12 hours) and a day's high/low and
 * condition say more about the cut-off than about the day.
 */
export const minimumSlotsPerDay = 4;

/** Current Weather 2.5 + 5 day / 3 hour Forecast 2.5 to a weather report. */
export const toWeatherReport = (
  current: CurrentWeatherResponse,
  forecast: ForecastResponse,
): WeatherReport => {
  const offset = current.timezone;
  const today = toLocalDate(current.dt, offset);
  const slots = forecast.list.filter(({ dt }) => dt > current.dt);
  const days = toDailyForecasts(
    [currentToReading(current), ...slots.map(slotToReading)],
    offset,
  );
  const slotCount = (date: string) =>
    slots.filter(({ dt }) => toLocalDate(dt, offset) === date).length;

  return {
    coordinates: current.coord,
    timezoneOffset: offset,
    current: toCurrentWeather(current),
    // The current reading guarantees today exists, and sorts first.
    today: days[0]!,
    forecast: days
      .filter(({ date }) => date > today)
      .filter(({ date }) => slotCount(date) >= minimumSlotsPerDay)
      .slice(0, forecastLength),
  };
};
