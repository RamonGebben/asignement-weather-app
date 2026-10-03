'use client';

import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBrowserPosition } from '~/hooks/useBrowserPosition';
import { useTRPC } from '~/providers/TrpcProvider';
import { formatLocationName } from '~/utils/formatLocationName';
import { toLocationSearchParams } from '~/utils/locationSearchParams';
import type { Location } from '~/weather/model';
import { toPositionLocation } from './toPositionLocation';

export { toPositionLocation } from './toPositionLocation';

const locationKey = ({ coordinates }: Location) =>
  `${coordinates.lat},${coordinates.lon}`;

// The server needs two real characters too - matches the input's minLength.
const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 300;

/**
 * Everything needed to change location - by searching or by the browser's
 * position. Choosing a place puts it in the current page's URL. Returns
 * the props for `LocationSearch`.
 *
 * `location` is the one parsed from the URL - the leading source of truth
 * the rest of the app derives from. The input mirrors it, including on
 * first load and back/forward navigation.
 */
export const useLocationSearch = (location: Location) => {
  const router = useRouter();
  const pathname = usePathname();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const position = useBrowserPosition();
  const [query, setQuery] = useState(() => formatLocationName(location));
  const [submittedQuery, setSubmittedQuery] = useState<string>();

  // The query we last set ourselves, not typed - lets the debounce below
  // skip re-searching for it.
  const [programmaticQuery, setProgrammaticQuery] = useState(query);

  // Adjust state during render (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  // rather than in an effect, so the input can't render stale for a frame.
  const [syncedKey, setSyncedKey] = useState(() => locationKey(location));
  const key = locationKey(location);
  if (key !== syncedKey) {
    setSyncedKey(key);
    const name = formatLocationName(location);
    setQuery(name);
    setProgrammaticQuery(name);
  }

  const isOwnQuery = query === programmaticQuery;
  const trimmedQuery = query.trim();
  const isSearchable = !isOwnQuery && trimmedQuery.length >= MIN_QUERY_LENGTH;

  // Below the minimum length, or still showing our own query: drop any
  // stale results right away.
  if (!isSearchable && submittedQuery !== undefined) {
    setSubmittedQuery(undefined);
  }

  // Search as the person types, debounced.
  useEffect(() => {
    if (!isSearchable) return;

    const timer = setTimeout(
      () => setSubmittedQuery(trimmedQuery),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [isSearchable, trimmedQuery]);

  const search = useQuery(
    trpc.location.search.queryOptions(
      submittedQuery === undefined ? skipToken : { query: submittedQuery },
    ),
  );

  /**
   * Show the chosen place: its name in the input, the other search results
   * gone, and the place in the URL.
   */
  const selectLocation = (selected: Location) => {
    const name = formatLocationName(selected);
    setQuery(name);
    setProgrammaticQuery(name);
    setSubmittedQuery(undefined);
    router.push(`${pathname}?${toLocationSearchParams(selected)}`, {
      scroll: false,
    });
  };

  const locateMe = async () => {
    const coordinates = await position.locate();
    if (!coordinates) return;

    const place = await queryClient
      .fetchQuery(trpc.location.reverse.queryOptions(coordinates))
      .catch(() => null);
    selectLocation(toPositionLocation(coordinates, place));
  };

  return {
    query,
    onQueryChange: setQuery,
    onSubmit: setSubmittedQuery,
    results: search.data,
    isSearching: search.isLoading,
    searchError: search.error,
    onSelect: selectLocation,
    positionStatus: position.status,
    onUseMyLocation: locateMe,
  };
};
