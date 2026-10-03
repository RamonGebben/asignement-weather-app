'use client';

import { useId } from 'react';
import { Grid } from '~/atoms/Grid';
import { Stack } from '~/atoms/Stack';
import { Caption, Lead, P } from '~/atoms/Typography';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import { ConditionIcon } from '~/molecules/ConditionIcon';
import { formatWeekday } from '~/utils/formatLocalTime';
import { formatTemperature } from '~/utils/formatWeather';
import { toConditionLabel } from '~/weather/condition/toConditionLabel';
import type { DailyForecast } from '~/weather/model';

export interface ForecastStripProps {
  /** Today first, then the coming days. */
  days: Array<DailyForecast>;
}

/** The days ahead at a glance: weekday, high, low and condition. */
export const ForecastStrip = ({ days }: ForecastStripProps) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <VisuallyHidden as="h2" id={headingId}>
        Forecast
      </VisuallyHidden>
      <Grid as="ol" $minColumnWidth="7rem" $gap="base">
        {days.map(({ date, condition, temperature }, index) => (
          <Stack as="li" key={date} $gap="xxs">
            <Caption>
              <time dateTime={date}>
                {index === 0 ? 'Today' : formatWeekday(date)}
              </time>
            </Caption>
            <ConditionIcon condition={condition} size="l" />
            <Lead>
              <VisuallyHidden>High </VisuallyHidden>
              {formatTemperature(temperature.max)}
            </Lead>
            <P $tone="muted">
              <VisuallyHidden>Low </VisuallyHidden>
              {formatTemperature(temperature.min)}
            </P>
            <Caption>{toConditionLabel(condition)}</Caption>
          </Stack>
        ))}
      </Grid>
    </section>
  );
};
