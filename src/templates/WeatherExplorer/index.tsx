'use client';

import type { ResponsePanelProps } from '~/molecules/ResponsePanel';
import { ResponsePanel } from '~/molecules/ResponsePanel';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { LocationSearch } from '~/organisms/LocationSearch';
import type { Location } from '~/weather/model';
import { Intro } from './components/Intro';
import { Main } from './components/Main';
import { Panels } from './components/Panels';

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
  <Main>
    <Intro location={location} />
    <LocationSearch {...search} />
    <Panels>
      {panels.map(panel => (
        <ResponsePanel key={panel.procedure} {...panel} />
      ))}
    </Panels>
  </Main>
);
