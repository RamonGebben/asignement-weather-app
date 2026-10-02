'use client';

import type { FormEvent } from 'react';
import { useId } from 'react';
import { Button } from '~/atoms/Button';
import { Stack } from '~/atoms/Stack';
import { TextInput } from '~/atoms/TextInput';
import { Label } from '~/atoms/Typography';
import type { PositionStatus } from '~/hooks/useBrowserPosition';
import type { Location } from '~/weather/model';
import { PositionMessage } from './components/PositionMessage';
import { Results } from './components/Results';

export interface LocationSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (query: string) => void;
  /** `undefined` until a search has been made. */
  results?: Array<Location>;
  isSearching: boolean;
  searchError?: { message: string } | null;
  onSelect: (location: Location) => void;
  positionStatus: PositionStatus;
  onUseMyLocation: () => void;
}

/** Change location by searching for a place or using the browser's position. */
export const LocationSearch = ({
  query,
  onQueryChange,
  onSubmit,
  results,
  isSearching,
  searchError,
  onSelect,
  positionStatus,
  onUseMyLocation,
}: LocationSearchProps) => {
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <Stack
      as="form"
      $gap="s"
      role="search"
      aria-label="Location"
      onSubmit={handleSubmit}
    >
      <Stack $gap="xs">
        <Label htmlFor={inputId}>Search for a place</Label>
        <Stack $direction="row" $wrap $gap="xs">
          <TextInput
            id={inputId}
            type="search"
            name="query"
            autoComplete="off"
            required
            minLength={2}
            maxLength={100}
            placeholder="e.g. Amsterdam"
            value={query}
            onChange={event => onQueryChange(event.target.value)}
          />
          <Button type="submit" $variant="primary" disabled={isSearching}>
            Search
          </Button>
          <Button
            $variant="secondary"
            onClick={onUseMyLocation}
            disabled={positionStatus === 'locating'}
          >
            Use my location
          </Button>
        </Stack>
      </Stack>
      <PositionMessage status={positionStatus} />
      <Results
        results={results}
        isSearching={isSearching}
        error={searchError}
        onSelect={onSelect}
      />
    </Stack>
  );
};
