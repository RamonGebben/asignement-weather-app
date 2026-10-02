import type { CurrentWeather } from '~/weather/model';
import type { CurrentWeatherResponse } from '../../schemas';
import { toIsoString } from '../toIsoString';
import { toWeatherCondition } from '../toWeatherCondition';
import { toWind } from '../toWind';

/** Visibility is capped at 10 km by the provider and omitted when unknown. */
export const maxVisibility = 10_000;

/** Current Weather 2.5 payload to our current conditions. */
export const toCurrentWeather = (
  response: CurrentWeatherResponse,
): CurrentWeather => {
  // The schema guarantees at least one entry; the first is the primary one.
  const [primary] = response.weather;

  return {
    observedAt: toIsoString(response.dt),
    condition: toWeatherCondition(primary!.id),
    description: primary!.description,
    icon: primary!.icon,
    temperature: response.main.temp,
    feelsLike: response.main.feels_like,
    humidity: response.main.humidity,
    pressure: response.main.pressure,
    cloudiness: response.clouds.all,
    visibility: response.visibility ?? maxVisibility,
    precipitation: {
      rain: response.rain?.['1h'] ?? 0,
      snow: response.snow?.['1h'] ?? 0,
    },
    wind: toWind(response.wind),
    sun: {
      sunrise: toIsoString(response.sys.sunrise),
      sunset: toIsoString(response.sys.sunset),
    },
  };
};
