'use client';

import { use } from 'react';
import { useLocationSearch } from '~/hooks/useLocationSearch';
import { useWeatherReport } from '~/hooks/useWeatherReport';
import { WeatherExplorer } from '~/templates/WeatherExplorer';
import { parseLocationSearchParams } from '~/utils/locationSearchParams';
import { toDerivedWeather } from '~/utils/toDerivedWeather';

/** Development view: every response for the chosen location, raw. */
const ExplorerPage = ({ searchParams }: PageProps<'/explorer'>) => {
  const location = parseLocationSearchParams(use(searchParams));
  const locationSearch = useLocationSearch();
  const { query: weather, fetchedAt } = useWeatherReport(location.coordinates);
  const { search, reverse } = locationSearch;

  return (
    <WeatherExplorer
      location={location}
      search={locationSearch.props}
      panels={[
        {
          title: 'Weather',
          procedure: 'weather.get',
          input: location.coordinates,
          data: weather.data,
          isLoading: weather.isLoading,
          error: weather.error,
        },
        {
          title: 'Derived on the client',
          procedure: 'toDerivedWeather',
          input: fetchedAt ? { at: fetchedAt.toISOString() } : undefined,
          data:
            weather.data && fetchedAt
              ? toDerivedWeather(weather.data, fetchedAt)
              : undefined,
          isLoading: weather.isLoading,
          error: weather.error,
        },
        {
          title: 'Search results',
          procedure: 'location.search',
          input: search.input,
          data: search.query.data,
          isLoading: search.query.isLoading,
          error: search.query.error,
        },
        {
          title: 'Place at my position',
          procedure: 'location.reverse',
          input: reverse.input,
          data: reverse.query.data,
          isLoading: reverse.query.isLoading,
          error: reverse.query.error,
        },
      ]}
    />
  );
};

export default ExplorerPage;
