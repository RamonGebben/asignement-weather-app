'use client';

import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';
import { Message } from '../Message';
import { List } from './components/List';
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
  if (isSearching) return <Message role="status">Searching…</Message>;
  if (error) {
    return (
      <Message role="alert" $tone="error">
        Search failed: {error.message}
      </Message>
    );
  }
  if (results === undefined) return null;
  if (results.length === 0) {
    return <Message role="status">No places found.</Message>;
  }

  return (
    <>
      <Message role="status">
        {results.length === 1
          ? '1 place found.'
          : `${results.length} places found.`}
      </Message>
      <List aria-label="Search results">
        {results.map(location => (
          <li key={`${location.coordinates.lat},${location.coordinates.lon}`}>
            <ResultButton onClick={() => onSelect(location)}>
              {formatLocationName(location)}
            </ResultButton>
          </li>
        ))}
      </List>
    </>
  );
};
