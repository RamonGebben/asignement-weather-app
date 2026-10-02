import { createCallerFactory, router } from '~/server/trpc';
import { locationRouter } from './location';
import { weatherRouter } from './weather';

export const appRouter = router({
  weather: weatherRouter,
  location: locationRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
