'use client';

import { useId } from 'react';
import { GlassPanel } from '~/atoms/GlassPanel';
import { Stack } from '~/atoms/Stack';
import { H2, Lead } from '~/atoms/Typography';
import { StatList } from '~/molecules/StatList';
import { formatWindSpeed } from '~/utils/formatWeather';
import type { Wind } from '~/weather/model';
import { toBeaufort } from '~/weather/wind/toBeaufort';
import { toCompassPoint } from '~/weather/wind/toCompassPoint';

/** Wind right now: speed, where it comes from, and how gusty it is. */
export const WindCard = ({ wind }: { wind: Wind }) => {
  const headingId = useId();

  return (
    <GlassPanel as="section" $gap="s" aria-labelledby={headingId}>
      <Stack $direction="row" $justify="space-between" $align="baseline">
        <H2 id={headingId}>Wind status</H2>
        <Lead>{formatWindSpeed(wind.speed)}</Lead>
      </Stack>
      <StatList
        stats={[
          {
            label: 'From',
            value: `${toCompassPoint(wind.direction)} (${Math.round(wind.direction)}°)`,
          },
          {
            label: 'Gusts',
            value:
              wind.gust === undefined
                ? 'None reported'
                : formatWindSpeed(wind.gust),
          },
          { label: 'Beaufort', value: `Force ${toBeaufort(wind.speed)}` },
        ]}
      />
    </GlassPanel>
  );
};
