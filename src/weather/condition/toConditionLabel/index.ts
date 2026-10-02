import type { WeatherCondition } from '~/weather/model';

const labels = {
  clear: 'Clear',
  'partly-cloudy': 'Partly Cloudy',
  cloudy: 'Cloudy',
  rain: 'Rain',
  'heavy-rain': 'Heavy Rain',
  storm: 'Thunderstorms',
  snow: 'Snow',
  fog: 'Fog',
} as const satisfies Record<WeatherCondition, string>;

/** A condition as a headline, e.g. `storm` → "Thunderstorms". */
export const toConditionLabel = (condition: WeatherCondition) =>
  labels[condition];
