import type { IconName } from '~/atoms/Icon';
import type { WeatherCondition } from '~/weather/model';

/** Which `Icon` represents each condition. */
export const conditionIcons = {
  clear: 'sun',
  'partly-cloudy': 'cloud-sun',
  cloudy: 'cloud',
  rain: 'cloud-rain',
  'heavy-rain': 'cloud-rain-wind',
  storm: 'cloud-lightning',
  snow: 'cloud-snow',
  fog: 'cloud-fog',
} as const satisfies Record<WeatherCondition, IconName>;
