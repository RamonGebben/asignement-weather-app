'use client';

import { useId } from 'react';
import { GlassPanel } from '~/atoms/GlassPanel';
import { Meter } from '~/atoms/Meter';
import { Stack } from '~/atoms/Stack';
import { Caption, H2, Label } from '~/atoms/Typography';
import { StatList } from '~/molecules/StatList';
import { formatLocalTime } from '~/utils/formatLocalTime';
import { formatPercentage } from '~/utils/formatWeather';
import type { SunTimes } from '~/weather/model';
import { getSunArcPosition } from '~/weather/sun/getSunArcPosition';

export interface SunCardProps {
  sun: SunTimes;
  /** The location's offset from UTC in seconds. */
  timezoneOffset: number;
  /** The moment to place the sun at. */
  now: Date;
}

const describeDaylight = (progress: number, isDaytime: boolean) => {
  if (isDaytime) return `${formatPercentage(progress)} of daylight has passed.`;
  return progress === 0 ? 'The sun hasn’t risen yet.' : 'The sun has set.';
};

/** Sunrise, sunset, and how far through the day the sun is. */
export const SunCard = ({ sun, timezoneOffset, now }: SunCardProps) => {
  const headingId = useId();
  const meterId = useId();
  const { progress, isDaytime } = getSunArcPosition(now, sun);

  return (
    <GlassPanel as="section" $gap="s" aria-labelledby={headingId}>
      <H2 id={headingId}>Sunrise &amp; sunset</H2>
      <StatList
        stats={[
          {
            label: 'Sunrise',
            value: (
              <time dateTime={sun.sunrise}>
                {formatLocalTime(sun.sunrise, timezoneOffset)}
              </time>
            ),
          },
          {
            label: 'Sunset',
            value: (
              <time dateTime={sun.sunset}>
                {formatLocalTime(sun.sunset, timezoneOffset)}
              </time>
            ),
          },
        ]}
      />
      <Stack $gap="xxs">
        <Label htmlFor={meterId}>Daylight</Label>
        <Meter id={meterId} min={0} max={1} value={progress} />
        <Caption $tone="muted">{describeDaylight(progress, isDaytime)}</Caption>
      </Stack>
    </GlassPanel>
  );
};
