import type { Wind } from '~/weather/model';

/** Provider wind block to our wind. Gusts are only reported when present. */
export const toWind = ({
  speed,
  deg,
  gust,
}: {
  speed: number;
  deg: number;
  gust?: number;
}): Wind => ({
  speed,
  direction: deg,
  ...(gust === undefined ? {} : { gust }),
});
