import type { Location } from '~/weather/model';

/** A place as people read it, e.g. "Amsterdam, North Holland, NL". */
export const formatLocationName = ({ name, state, country }: Location) =>
  [name, state, country].filter(Boolean).join(', ');
