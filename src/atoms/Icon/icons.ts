import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  LocateFixed,
  Moon,
  Sun,
} from 'lucide-react';

/** The subset of lucide icons available through `Icon`, keyed by name. */
export const icons = {
  cloud: Cloud,
  'cloud-fog': CloudFog,
  'cloud-lightning': CloudLightning,
  'cloud-rain': CloudRain,
  'cloud-rain-wind': CloudRainWind,
  'cloud-snow': CloudSnow,
  'cloud-sun': CloudSun,
  locate: LocateFixed,
  moon: Moon,
  sun: Sun,
} as const;

export type IconName = keyof typeof icons;
