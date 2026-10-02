'use client';

import { Stack } from '~/atoms/Stack';
import { Caption } from '~/atoms/Typography';
import { CurrentConditions } from '~/organisms/CurrentConditions';
import { ForecastStrip } from '~/organisms/ForecastStrip';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { SunCard } from '~/organisms/SunCard';
import { WindCard } from '~/organisms/WindCard';
import { formatLocationName } from '~/utils/formatLocationName';
import type { Location, WeatherReport } from '~/weather/model';
import { Area } from './components/Area';
import { Layout } from './components/Layout';
import { Shell } from './components/Shell';

export interface WeatherDashboardProps {
  location: Location;
  search: LocationSearchProps;
  report?: WeatherReport;
  /** When the report was fetched; the sun's position is shown for then. */
  fetchedAt?: Date;
  isLoading: boolean;
  error?: { message: string } | null;
}

/** The weather for one place: conditions, wind, sun and the days ahead. */
export const WeatherDashboard = ({
  location,
  search,
  report,
  fetchedAt,
  isLoading,
  error,
}: WeatherDashboardProps) => {
  if (isLoading) {
    return (
      <Shell search={search}>
        <Caption $tone="muted" role="status">
          Loading the weather for {formatLocationName(location)}…
        </Caption>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell search={search}>
        <Caption $tone="error" role="alert">
          Couldn’t load the weather: {error.message}
        </Caption>
      </Shell>
    );
  }

  if (!report || !fetchedAt) {
    return (
      <Shell search={search}>
        <Caption $tone="muted" role="status">
          No weather to show yet.
        </Caption>
      </Shell>
    );
  }

  return (
    <Shell
      search={search}
      observed={{
        at: report.current.observedAt,
        timezoneOffset: report.timezoneOffset,
      }}
    >
      <Layout>
        <Area $area="hero">
          <CurrentConditions
            location={location}
            current={report.current}
            today={report.today}
          />
        </Area>
        <Area $area="side">
          <Stack $gap="base">
            <WindCard wind={report.current.wind} />
            <SunCard
              sun={report.current.sun}
              timezoneOffset={report.timezoneOffset}
              now={fetchedAt}
            />
          </Stack>
        </Area>
        <Area $area="forecast">
          <ForecastStrip days={[report.today, ...report.forecast]} />
        </Area>
      </Layout>
    </Shell>
  );
};
