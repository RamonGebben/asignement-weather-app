import { coordinatesInput, locationSearchInput } from '~/server/inputs';
import { publicProcedure, router } from '~/server/trpc';

export const locationRouter = router({
  /** Places matching a name, best match first. */
  search: publicProcedure
    .input(locationSearchInput)
    .query(({ ctx, input }) =>
      ctx.openWeatherMap.geocode(input.query, input.limit),
    ),

  /** The place at some coordinates, e.g. the browser's position. */
  reverse: publicProcedure
    .input(coordinatesInput)
    .query(({ ctx, input }) => ctx.openWeatherMap.reverseGeocode(input)),
});
