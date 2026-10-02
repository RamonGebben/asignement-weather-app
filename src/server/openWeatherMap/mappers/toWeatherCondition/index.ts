import type { WeatherCondition } from '~/weather/model';

/**
 * OpenWeatherMap condition id to our condition vocabulary.
 * See https://openweathermap.org/weather-conditions.
 */
export const toWeatherCondition = (id: number): WeatherCondition => {
  // 781 is "tornado", which lives in the atmosphere (7xx) group.
  if (id === 781) return 'storm';

  const group = Math.floor(id / 100);

  if (group === 2) return 'storm';
  if (group === 3) return 'rain';
  if (group === 5) return isHeavyRain(id) ? 'heavy-rain' : 'rain';
  if (group === 6) return 'snow';
  if (group === 7) return 'fog';
  if (id === 800) return 'clear';
  if (id === 801 || id === 802) return 'partly-cloudy';
  if (id === 803 || id === 804) return 'cloudy';

  // Unknown ids are rare; a neutral overcast sky is the least surprising.
  return 'cloudy';
};

const isHeavyRain = (id: number) =>
  (id >= 502 && id <= 504) || id === 522 || id === 531;
