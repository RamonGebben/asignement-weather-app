import { coordinatesInput } from '~/server/inputs';
import { publicProcedure, router } from '~/server/trpc';

export const weatherRouter = router({
  /** Current conditions, today's range and the next five days. */
  get: publicProcedure
    .input(coordinatesInput)
    .query(({ ctx, input }) => ctx.openWeatherMap.weather(input)),
});
