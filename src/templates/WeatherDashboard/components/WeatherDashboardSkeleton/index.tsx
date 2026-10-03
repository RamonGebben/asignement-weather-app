'use client';

import { GlassPanel } from '~/atoms/GlassPanel';
import { Grid } from '~/atoms/Grid';
import { Skeleton } from '~/atoms/Skeleton';
import { Stack } from '~/atoms/Stack';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import { formatLocationName } from '~/utils/formatLocationName';
import type { Location } from '~/weather/model';
import { Area } from '../Area';
import { Layout } from '../Layout';

/** Today plus the usual number of forecast days (see the daily rollup rules). */
const forecastDays = 6;

export const WeatherDashboardSkeleton = ({
  location,
}: {
  location: Location;
}) => (
  <Layout>
    <VisuallyHidden role="status">
      Loading the weather for {formatLocationName(location)}…
    </VisuallyHidden>
    <Area $area="hero">
      <GlassPanel $gap="m">
        <Stack $gap="xs">
          <Skeleton $width="50%" $height="1.75rem" />
          <Skeleton $width="35%" $height="1.25rem" />
          <Skeleton $width="80%" />
        </Stack>
        <Skeleton $width="8rem" $height="3.5rem" />
        <Stack $direction="row" $wrap $gap="xs">
          <Skeleton $width="7rem" $height="1.5rem" />
          <Skeleton $width="7rem" $height="1.5rem" />
        </Stack>
      </GlassPanel>
    </Area>
    <Area $area="side">
      <Stack $gap="base">
        <GlassPanel $gap="s">
          <Skeleton $width="45%" $height="1.25rem" />
          <Skeleton $width="60%" />
          <Skeleton $width="50%" />
          <Skeleton $width="55%" />
        </GlassPanel>
        <GlassPanel $gap="s">
          <Skeleton $width="55%" $height="1.25rem" />
          <Skeleton $width="60%" />
          <Skeleton $width="60%" />
          <Skeleton $height="0.5rem" />
        </GlassPanel>
      </Stack>
    </Area>
    <Area $area="forecast">
      <GlassPanel>
        <Grid $minColumnWidth="7rem" $gap="base">
          {Array.from({ length: forecastDays }, (_, index) => (
            <Stack key={index} $gap="xxs">
              <Skeleton $width="60%" $height="0.875rem" />
              <Skeleton $width="70%" $height="1.25rem" />
              <Skeleton $width="50%" $height="0.875rem" />
              <Skeleton $width="65%" $height="0.875rem" />
            </Stack>
          ))}
        </Grid>
      </GlassPanel>
    </Area>
  </Layout>
);
