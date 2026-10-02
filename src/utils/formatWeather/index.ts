/** °C rounded to a whole degree, e.g. `20.3` → "20°". */
export const formatTemperature = (celsius: number) =>
  // `+ 0` turns -0 (from rounding -0.4) into 0.
  `${Math.round(celsius) + 0}°`;

/** m/s as km/h with one decimal, e.g. `3.13` → "11.3 km/h". */
export const formatWindSpeed = (metresPerSecond: number) =>
  `${(metresPerSecond * 3.6).toFixed(1)} km/h`;

/** A 0-1 fraction as a whole percentage, e.g. `0.64` → "64%". */
export const formatPercentage = (fraction: number) =>
  `${Math.round(fraction * 100)}%`;
