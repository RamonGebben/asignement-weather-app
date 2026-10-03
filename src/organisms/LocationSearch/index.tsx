'use client';

import type { KeyboardEvent, SubmitEvent } from 'react';
import { useId, useRef, useState } from 'react';
import { Stack } from '~/atoms/Stack';
import { TextInput } from '~/atoms/TextInput';
import { Label } from '~/atoms/Typography';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import type { PositionStatus } from '~/hooks/useBrowserPosition';
import { Button } from '~/molecules/Button';
import { Dropdown } from '~/molecules/Dropdown';
import type { Location } from '~/weather/model';
import { PositionMessage } from './components/PositionMessage';
import { optionId, Results } from './components/Results';
import { locateButtonVariant } from './locateButtonVariant';

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
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const locateButtonRef = useRef<HTMLButtonElement>(null);

  // The option arrow keys have moved to, without moving real focus off the
  // input - so it survives the list floating in a portal (see `Dropdown`),
  // wherever that lands in the DOM's own tab order.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Reset it whenever a fresh set of results comes in, adjusting state
  // during render (https://react.dev/learn/you-might-not-need-an-effect)
  // rather than in an effect.
  const [syncedResults, setSyncedResults] = useState(results);
  if (results !== syncedResults) {
    setSyncedResults(results);
    setActiveIndex(null);
  }

  const hasOptions = results !== undefined && results.length > 0;
  const hasDropdown =
    isSearching || Boolean(searchError) || results !== undefined;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query.trim());
  };

  // The chosen result's button disappears with the list, so hand focus back
  // to the input - now showing the chosen place - instead of losing it.
  const handleSelect = (location: Location) => {
    onSelect(location);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(index =>
          index === null || index === results.length - 1 ? 0 : index + 1,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(index =>
          index === null || index === 0 ? results.length - 1 : index - 1,
        );
        break;
      case 'Enter':
        // Otherwise let the form's own submit handling run instead.
        if (activeIndex !== null) {
          event.preventDefault();
          handleSelect(results[activeIndex]);
        }
        break;
      case 'Escape':
        setActiveIndex(null);
        break;
    }
  };

  return (
    <Stack
      as="form"
      $gap="xs"
      role="search"
      aria-label="Location"
      onSubmit={handleSubmit}
    >
      <Stack ref={rowRef} $direction="row" $align="center" $gap="xs">
        <VisuallyHidden>
          <Label htmlFor={inputId}>Search for a place</Label>
        </VisuallyHidden>
        <TextInput
          ref={inputRef}
          id={inputId}
          type="search"
          name="query"
          autoComplete="off"
          required
          minLength={2}
          maxLength={100}
          pattern=".*\S.*\S.*" // minLength counts spaces; the server needs two real characters.
          title="Enter at least two characters"
          placeholder="e.g. Utrecht"
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls={hasOptions ? listboxId : undefined}
          aria-activedescendant={
            hasOptions && activeIndex !== null
              ? optionId(listboxId, activeIndex)
              : undefined
          }
        />
        <Button type="submit" $variant="primary" disabled={isSearching}>
          Search
        </Button>
        <Button
          ref={locateButtonRef}
          $variant={locateButtonVariant(positionStatus)}
          icon="locate"
          $iconOnly
          onClick={onUseMyLocation}
          disabled={positionStatus === 'locating'}
        >
          Use my location
        </Button>
      </Stack>
      <PositionMessage status={positionStatus} anchorRef={locateButtonRef} />
      {hasDropdown && (
        <Dropdown anchorRef={rowRef}>
          <Results
            listboxId={listboxId}
            results={results}
            isSearching={isSearching}
            error={searchError}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </Dropdown>
      )}
    </Stack>
  );
};
