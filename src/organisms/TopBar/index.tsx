'use client';

import { GlassPanel } from '~/atoms/GlassPanel';
import { Caption, P } from '~/atoms/Typography';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { LocationSearch } from '~/organisms/LocationSearch';
import { formatLocalDate, formatLocalTime } from '~/utils/formatLocalTime';

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
    $align="flex-start"
    $gap="m"
  >
    <P>Weather</P>
    <LocationSearch {...search} />
    {observed ? (
      <Caption>
        <time dateTime={observed.at}>
          {formatLocalDate(observed.at, observed.timezoneOffset)} ·{' '}
          {formatLocalTime(observed.at, observed.timezoneOffset)}
        </time>
      </Caption>
    ) : null}
  </GlassPanel>
);
