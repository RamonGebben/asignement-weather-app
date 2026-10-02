import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { CreateContext } from '~/server/context';
import { appRouter } from '~/server/routers';

export const trpcEndpoint = '/api/trpc';

/** A `Request → Response` handler for the app router, mounted at `/api/trpc`. */
export const createTrpcHandler =
  (createContext: CreateContext) => (request: Request) =>
    fetchRequestHandler({
      endpoint: trpcEndpoint,
      req: request,
      router: appRouter,
      createContext,
      onError: ({ error, path }) => {
        // BAD_GATEWAY is a provider outage or payload drift - worth seeing too.
        if (
          error.code === 'INTERNAL_SERVER_ERROR' ||
          error.code === 'BAD_GATEWAY'
        ) {
          console.error(
            `tRPC ${path ?? '<no path>'} failed:`,
            error.cause ?? error,
          );
        }
      },
    });
