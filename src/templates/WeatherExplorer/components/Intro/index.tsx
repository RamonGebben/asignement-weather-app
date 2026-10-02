'use client';

import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';
import { Lead } from './components/Lead';
import { Title } from './components/Title';

export const Intro = ({ location }: { location: Location }) => (
  <header>
    <Title>Weather Explorer</Title>
    <Lead aria-live="polite">
      Showing <strong>{formatLocationName(location)}</strong> (
      {location.coordinates.lat}, {location.coordinates.lon})
    </Lead>
  </header>
);
