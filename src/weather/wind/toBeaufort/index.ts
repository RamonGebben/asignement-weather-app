/** Upper bound (exclusive, m/s) of Beaufort forces 0-11; anything above is 12. */
const upperBounds = [
  0.5, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7,
] as const;

export type Beaufort = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Wind speed in m/s to its Beaufort force. */
export const toBeaufort = (speed: number): Beaufort => {
  const force = upperBounds.findIndex(bound => speed < bound);
  return (force === -1 ? 12 : force) as Beaufort;
};
