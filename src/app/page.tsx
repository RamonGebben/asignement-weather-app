'use client';

import { use } from 'react';
import { useLocationSearch } from '~/hooks/useLocationSearch';
import { useWeatherReport } from '~/hooks/useWeatherReport';
import { WeatherDashboard } from '~/templates/WeatherDashboard';
import { parseLocationSearchParams } from '~/utils/locationSearchParams';

const HomePage = ({ searchParams }: PageProps<'/'>) => {
  const location = parseLocationSearchParams(use(searchParams));
  const locationSearch = useLocationSearch();
  const { query: weather, fetchedAt } = useWeatherReport(location.coordinates);

  return (
    <WeatherDashboard
      location={location}
      search={locationSearch.props}
      report={weather.data}
      fetchedAt={fetchedAt}
      isLoading={weather.isLoading}
      error={weather.error}
    />
  );
};

export default HomePage;
