'use client';

import { GlassPanel } from '~/atoms/GlassPanel';
import { Stack } from '~/atoms/Stack';
import { Caption } from '~/atoms/Typography';
import { useNeutralSky } from '~/hooks/useNeutralSky';
import { CurrentConditions } from '~/organisms/CurrentConditions';
import { ForecastStrip } from '~/organisms/ForecastStrip';
import type { LocationSearchProps } from '~/organisms/LocationSearch';
import { SunCard } from '~/organisms/SunCard';
import { WindCard } from '~/organisms/WindCard';
import { toSky } from '~/theme/sky';
import type { Location, WeatherReport } from '~/weather/model';
import { getGoldenHour } from '~/weather/sun/getGoldenHour';
import { getSunArcPosition } from '~/weather/sun/getSunArcPosition';
import { Area } from './components/Area';
import { Layout } from './components/Layout';
import { Shell } from './components/Shell';
import { WeatherDashboardSkeleton } from './components/WeatherDashboardSkeleton';

export interface WeatherDashboardProps {
  location: Location;
  search: LocationSearchProps;
  report?: WeatherReport;
  fetchedAt?: Date;
  isLoading: boolean;
  error?: { message: string } | null;
}

export const WeatherDashboard = ({
  location,
  search,
  report,
  fetchedAt,
  isLoading,
  error,
}: WeatherDashboardProps) => {
  const neutralSky = useNeutralSky();
  const defaultProps = { search, sky: neutralSky };

  if (isLoading) {
    return (
      <Shell {...defaultProps}>
        <WeatherDashboardSkeleton location={location} />
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell {...defaultProps}>
        <GlassPanel>
          <Caption $tone="error" role="alert">
            Couldn’t load the weather: {error.message}
          </Caption>
        </GlassPanel>
      </Shell>
    );
  }

  if (!report || !fetchedAt) {
    return (
      <Shell {...defaultProps}>
        <GlassPanel>
          <Caption $tone="muted" role="status">
            No weather to show yet.
          </Caption>
        </GlassPanel>
      </Shell>
    );
  }

  const { isDaytime } = getSunArcPosition(fetchedAt, report.current.sun);

  return (
    <Shell
      search={search}
      sky={toSky({
        condition: report.current.condition,
        isDaytime,
        goldenHour: getGoldenHour(fetchedAt, report.current.sun),
      })}
      observed={{
        at: report.current.observedAt,
        timezoneOffset: report.timezoneOffset,
      }}
    >
      <Layout>
        <Area $area="hero">
          <GlassPanel>
            <CurrentConditions
              location={location}
              current={report.current}
              today={report.today}
            />
          </GlassPanel>
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
          <GlassPanel>
            <ForecastStrip days={[report.today, ...report.forecast]} />
          </GlassPanel>
        </Area>
      </Layout>
    </Shell>
  );
};
