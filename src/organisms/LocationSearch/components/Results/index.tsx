'use client';

import { Stack } from '~/atoms/Stack';
import { Caption } from '~/atoms/Typography';
import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';
import { ResultButton } from './components/ResultButton';

export interface ResultsProps {
  results?: Array<Location>;
  isSearching: boolean;
  error?: { message: string } | null;
  onSelect: (location: Location) => void;
}

export const Results = ({
  results,
  isSearching,
  error,
  onSelect,
}: ResultsProps) => {
  if (isSearching) {
    return (
      <Caption $tone="muted" role="status">
        Searching…
      </Caption>
    );
  }
  if (error) {
    return (
      <Caption $tone="error" role="alert">
        Search failed: {error.message}
      </Caption>
    );
  }
  if (results === undefined) return null;
  if (results.length === 0) {
    return (
      <Caption $tone="muted" role="status">
        No places found.
      </Caption>
    );
  }

  return (
    <>
      <Caption $tone="muted" role="status">
        {results.length === 1
          ? '1 place found.'
          : `${results.length} places found.`}
      </Caption>
      {/* role="list" keeps list semantics in Safari once bullets are gone. */}
      <Stack as="ul" role="list" $gap="xxs" aria-label="Search results">
        {results.map(location => (
          <li key={`${location.coordinates.lat},${location.coordinates.lon}`}>
            <ResultButton onClick={() => onSelect(location)}>
              {formatLocationName(location)}
            </ResultButton>
          </li>
        ))}
      </Stack>
    </>
  );
};
