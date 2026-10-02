'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '~/server/routers';

const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

/** Typed tRPC query/mutation options, e.g. `useQuery(trpc.weather.get.queryOptions(...))`. */
export { useTRPC };

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Weather moves slowly; the provider itself refreshes ~every 10 min.
        staleTime: 5 * 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined;

/** A fresh client per server render, one shared client in the browser. */
const getQueryClient = () => {
  if (isServer) return createQueryClient();
  browserQueryClient ??= createQueryClient();
  return browserQueryClient;
};

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [httpBatchLink({ url: '/api/trpc' })],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
