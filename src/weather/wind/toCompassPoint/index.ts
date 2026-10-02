const compassPoints = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export type CompassPoint = (typeof compassPoints)[number];

const sectorSize = 360 / compassPoints.length;

/**
 * Degrees (any range, including negative) to the nearest of the 16 compass
 * points. Each covers a 22.5° sector centred on its bearing, e.g. N is
 * 348.75°-11.25°.
 *
 * @see https://en.wikipedia.org/wiki/Points_of_the_compass
 */
export const toCompassPoint = (degrees: number): CompassPoint => {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / sectorSize) % compassPoints.length;
  return compassPoints[index];
};
