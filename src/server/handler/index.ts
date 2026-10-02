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
        if (error.code === 'INTERNAL_SERVER_ERROR') {
          console.error(
            `tRPC ${path ?? '<no path>'} failed:`,
            error.cause ?? error,
          );
        }
      },
    });
