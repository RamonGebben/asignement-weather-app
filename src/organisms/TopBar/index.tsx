'use client';

import { GlassPanel } from '~/atoms/GlassPanel';
import { Stack } from '~/atoms/Stack';
import { P } from '~/atoms/Typography';
import { ColorModeToggle } from '~/molecules/ColorModeToggle';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { LocationSearch } from '~/organisms/LocationSearch';
import { ObservedTime } from './components/ObservedTime';

export interface TopBarProps {
  search: LocationSearchProps;
  /** When the shown conditions were observed; omitted while loading. */
  observed?: { at: string; timezoneOffset: number };
}

/** Brand, location search and the local time of the observation. */
export const TopBar = ({ search, observed }: TopBarProps) => (
  <GlassPanel
    as="header"
    $direction="row"
    $wrap
    $justify="space-between"
    $align="center"
    $gap="m"
  >
    <P>Weather</P>
    <LocationSearch {...search} />
    <Stack $direction="row" $align="center" $gap="s">
      <ObservedTime observed={observed} />
      <ColorModeToggle />
    </Stack>
  </GlassPanel>
);
