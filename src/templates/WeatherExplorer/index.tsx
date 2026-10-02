'use client';

import { Container } from '~/atoms/Container';
import { Grid } from '~/atoms/Grid';
import { H1, Lead } from '~/atoms/Typography';
import type { ResponsePanelProps } from '~/molecules/ResponsePanel';
import { ResponsePanel } from '~/molecules/ResponsePanel';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { LocationSearch } from '~/organisms/LocationSearch';
import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';

export interface WeatherExplorerProps {
  location: Location;
  search: LocationSearchProps;
  panels: Array<ResponsePanelProps>;
}

/**
 * A plain-HTML view of everything the app knows about a location: change
 * the location, and inspect every response raw.
 */
export const WeatherExplorer = ({
  location,
  search,
  panels,
}: WeatherExplorerProps) => (
  <Container as="main" $gap="m">
    <header>
      <H1>Weather Explorer</H1>
      <Lead $tone="muted" aria-live="polite">
        Showing <strong>{formatLocationName(location)}</strong> (
        {location.coordinates.lat}, {location.coordinates.lon})
      </Lead>
    </header>
    <LocationSearch {...search} />
    <Grid $minColumnWidth="28rem">
      {panels.map(panel => (
        <ResponsePanel key={panel.procedure} {...panel} />
      ))}
    </Grid>
  </Container>
);
