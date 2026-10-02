import type { WeatherCondition, Wind } from '~/weather/model';
import type { CurrentWeatherResponse, ForecastSlot } from '../../schemas';
import { toWeatherCondition } from '../toWeatherCondition';
import { toWind } from '../toWind';

/**
 * One point-in-time sample, from either a 3-hour forecast slot or the
 * current observation, in a shape days can be aggregated from.
 */
export interface Reading {
  /** Epoch seconds. */
  dt: number;
  isDaytime: boolean;
  condition: WeatherCondition;
  description: string;
  icon: string;
  /** °C */
  min: number;
  /** °C */
  max: number;
  /** 0-1 */
  pop: number;
  wind: Wind;
}

export const slotToReading = (slot: ForecastSlot): Reading => {
  const [primary] = slot.weather;

  return {
    dt: slot.dt,
    isDaytime: slot.sys.pod === 'd',
    condition: toWeatherCondition(primary!.id),
    description: primary!.description,
    icon: primary!.icon,
    min: slot.main.temp_min,
    max: slot.main.temp_max,
    pop: slot.pop,
    wind: toWind(slot.wind),
  };
};

/**
 * The current observation as a reading. Its `temp_min`/`temp_max` describe
 * the spread across nearby stations, not the day, so only `temp` is used.
 * It carries no precipitation probability - what's falling now is known.
 */
export const currentToReading = (current: CurrentWeatherResponse): Reading => {
  const [primary] = current.weather;

  return {
    dt: current.dt,
    isDaytime:
      current.dt >= current.sys.sunrise && current.dt < current.sys.sunset,
    condition: toWeatherCondition(primary!.id),
    description: primary!.description,
    icon: primary!.icon,
    min: current.main.temp,
    max: current.main.temp,
    pop: 0,
    wind: toWind(current.wind),
  };
};
