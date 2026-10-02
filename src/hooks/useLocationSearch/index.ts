'use client';

import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBrowserPosition } from '~/hooks/useBrowserPosition';
import { useTRPC } from '~/providers/TrpcProvider';
import { formatLocationName } from '~/utils/formatLocationName';
import { toLocationSearchParams } from '~/utils/locationSearchParams';
import type { Location } from '~/weather/model';
import { toPositionLocation } from './toPositionLocation';

export { toPositionLocation } from './toPositionLocation';

/**
 * Everything needed to change location - by searching or by the browser's
 * position. Choosing a place puts it in the current page's URL.
 */
export const useLocationSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const position = useBrowserPosition();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string>();

  const searchInput =
    submittedQuery === undefined ? undefined : { query: submittedQuery };
  const search = useQuery(
    trpc.location.search.queryOptions(searchInput ?? skipToken),
  );
  const reverse = useQuery(
    trpc.location.reverse.queryOptions(position.coordinates ?? skipToken),
  );

  /**
   * Show the chosen place: its name in the input, the other search results
   * gone, and the place in the URL.
   */
  const selectLocation = (location: Location) => {
    setQuery(formatLocationName(location));
    setSubmittedQuery(undefined);
    router.push(`${pathname}?${toLocationSearchParams(location)}`, {
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
    /** Ready to spread into `LocationSearch`. */
    props: {
      query,
      onQueryChange: setQuery,
      onSubmit: setSubmittedQuery,
      results: search.data,
      isSearching: search.isLoading,
      searchError: search.error,
      onSelect: selectLocation,
      positionStatus: position.status,
      onUseMyLocation: locateMe,
    },
    search: { input: searchInput, query: search },
    reverse: { input: position.coordinates, query: reverse },
  };
};
