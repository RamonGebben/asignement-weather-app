'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/providers/TrpcProvider';
import type { Coordinates } from '~/weather/model';

/** Matches how often the provider refreshes its data. */
export const weatherRefetchInterval = 10 * 60 * 1000;

/** The weather report for a place, kept fresh while the page is open. */
export const useWeatherReport = (coordinates: Coordinates) => {
  const trpc = useTRPC();
  const query = useQuery(
    trpc.weather.get.queryOptions(coordinates, {
      refetchInterval: weatherRefetchInterval,
    }),
  );

  return {
    query,
    /** When the report was fetched - the moment it describes. */
    fetchedAt: query.data ? new Date(query.dataUpdatedAt) : undefined,
  };
};
