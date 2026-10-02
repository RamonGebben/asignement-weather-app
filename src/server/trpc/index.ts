import { initTRPC, TRPCError } from '@trpc/server';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server';
import type { Context } from '~/server/context';
import type { OpenWeatherMapErrorKind } from '~/server/openWeatherMap';
import { OpenWeatherMapError } from '~/server/openWeatherMap';

const t = initTRPC.context<Context>().create({
  isDev: process.env.NODE_ENV !== 'production',
});

const errorCodes = {
  // A rejected key is our misconfiguration, not the caller's.
  unauthorized: 'INTERNAL_SERVER_ERROR',
  'not-found': 'NOT_FOUND',
  'rate-limited': 'TOO_MANY_REQUESTS',
  upstream: 'BAD_GATEWAY',
  'invalid-response': 'BAD_GATEWAY',
} as const satisfies Record<OpenWeatherMapErrorKind, TRPC_ERROR_CODE_KEY>;

const errorMessages = {
  unauthorized: 'The weather service is misconfigured',
  'not-found': 'No weather data for this location',
  'rate-limited': 'Too many weather requests, try again shortly',
  upstream: 'The weather service is unavailable',
  'invalid-response': 'The weather service is unavailable',
} as const satisfies Record<OpenWeatherMapErrorKind, string>;

/**
 * Turns provider failures into client-safe tRPC errors. Without this they'd
 * all surface as a generic 500 carrying the provider's own message.
 */
const providerErrors = t.middleware(async ({ next }) => {
  const result = await next();

  if (!result.ok && result.error.cause instanceof OpenWeatherMapError) {
    const { kind } = result.error.cause;
    throw new TRPCError({
      code: errorCodes[kind],
      message: errorMessages[kind],
      cause: result.error.cause,
    });
  }

  return result;
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure.use(providerErrors);
