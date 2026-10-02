/** Provider epoch seconds to an ISO-8601 UTC string. */
export const toIsoString = (epochSeconds: number) =>
  new Date(epochSeconds * 1000).toISOString();

/** The `YYYY-MM-DD` date at a moment, in a location `offset` seconds from UTC. */
export const toLocalDate = (epochSeconds: number, offset: number) =>
  toIsoString(epochSeconds + offset).slice(0, 10);
