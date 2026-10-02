'use client';

import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { useBrowserPosition } from '~/hooks/useBrowserPosition';
import { useTRPC } from '~/providers/TrpcProvider';
import { WeatherExplorer } from '~/templates/WeatherExplorer';
import {
  parseLocationSearchParams,
  toLocationSearchParams,
} from '~/utils/locationSearchParams';
import { toDerivedWeather } from '~/utils/toDerivedWeather';
import type { Coordinates, Location } from '~/weather/model';

/** Matches how often the provider refreshes its data. */
const weatherRefetchInterval = 10 * 60 * 1000;

const HomePage = ({ searchParams }: PageProps<'/'>) => {
  const location = parseLocationSearchParams(use(searchParams));
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const position = useBrowserPosition();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string>();

  const weather = useQuery(
    trpc.weather.get.queryOptions(location.coordinates, {
      refetchInterval: weatherRefetchInterval,
    }),
  );
  const searchInput =
    submittedQuery === undefined ? undefined : { query: submittedQuery };
  const search = useQuery(
    trpc.location.search.queryOptions(searchInput ?? skipToken),
  );
  const reverse = useQuery(
    trpc.location.reverse.queryOptions(position.coordinates ?? skipToken),
  );

  const selectLocation = (selected: Location) =>
    router.push(`/?${toLocationSearchParams(selected)}`, { scroll: false });

  // Weather for where the user actually is, named after the nearest place.
  const useMyLocation = async () => {
    const coordinates = await position.locate();
    if (!coordinates) return;

    const place = await queryClient
      .fetchQuery(trpc.location.reverse.queryOptions(coordinates))
      .catch(() => null);
    selectLocation(toPositionLocation(coordinates, place));
  };

  return (
    <WeatherExplorer
      location={location}
      search={{
        query,
        onQueryChange: setQuery,
        onSubmit: setSubmittedQuery,
        results: search.data,
        isSearching: search.isLoading,
        searchError: search.error,
        onSelect: selectLocation,
        positionStatus: position.status,
        onUseMyLocation: useMyLocation,
      }}
      panels={[
        {
          title: 'Weather',
          procedure: 'weather.get',
          input: location.coordinates,
          data: weather.data,
          isLoading: weather.isLoading,
          error: weather.error,
        },
        {
          title: 'Derived on the client',
          procedure: 'toDerivedWeather',
          input: weather.data
            ? { at: new Date(weather.dataUpdatedAt).toISOString() }
            : undefined,
          data: weather.data
            ? toDerivedWeather(weather.data, new Date(weather.dataUpdatedAt))
            : undefined,
          isLoading: weather.isLoading,
          error: weather.error,
        },
        {
          title: 'Search results',
          procedure: 'location.search',
          input: searchInput,
          data: search.data,
          isLoading: search.isLoading,
          error: search.error,
        },
        {
          title: 'Place at my position',
          procedure: 'location.reverse',
          input: position.coordinates,
          data: reverse.data,
          isLoading: reverse.isLoading,
          error: reverse.error,
        },
      ]}
    />
  );
};

const toPositionLocation = (
  coordinates: Coordinates,
  place: Location | null,
): Location =>
  place
    ? { ...place, coordinates }
    : { name: 'Your location', country: '', coordinates };

export default HomePage;
