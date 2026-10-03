'use client';

import { Stack } from '~/atoms/Stack';
import { Caption } from '~/atoms/Typography';
import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';
import { ResultButton } from './components/ResultButton';

export interface ResultsProps {
  /** Matches the id `LocationSearch`'s input points `aria-controls` at. */
  listboxId: string;
  results?: Array<Location>;
  isSearching: boolean;
  error?: { message: string } | null;
  /** The option moved to by arrow keys, or `null` for none yet. */
  activeIndex: number | null;
  onSelect: (location: Location) => void;
}

/** `optionId` must match how `LocationSearch` builds `aria-activedescendant`. */
export const optionId = (listboxId: string, index: number) =>
  `${listboxId}-option-${index}`;

export const Results = ({
  listboxId,
  results,
  isSearching,
  error,
  activeIndex,
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
      <Stack
        as="ul"
        id={listboxId}
        role="listbox"
        $gap="xxs"
        aria-label="Search results"
      >
        {results.map((location, index) => (
          // role="presentation" keeps this an <li> for valid HTML without
          // the listitem role confusing the listbox/option tree below it.
          <li
            key={`${location.coordinates.lat},${location.coordinates.lon}`}
            role="presentation"
          >
            <ResultButton
              id={optionId(listboxId, index)}
              $active={index === activeIndex}
              aria-selected={index === activeIndex}
              onClick={() => onSelect(location)}
            >
              {formatLocationName(location)}
            </ResultButton>
          </li>
        ))}
      </Stack>
    </>
  );
};
