'use client';

import { Pill } from '~/atoms/Pill';
import { Stack } from '~/atoms/Stack';
import { Display, H1, Lead, P } from '~/atoms/Typography';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import { ConditionIcon } from '~/molecules/ConditionIcon';
import { formatLocationName } from '~/utils/formatLocationName';
import { formatTemperature } from '~/utils/formatWeather';
import { summarizeWeather } from '~/utils/summarizeWeather';
import { toConditionLabel } from '~/weather/condition/toConditionLabel';
import type { CurrentWeather, DailyForecast, Location } from '~/weather/model';

export interface CurrentConditionsProps {
  location: Location;
  current: CurrentWeather;
  today: DailyForecast;
}

/** The hero: what it's like outside right now, in words and numbers. */
export const CurrentConditions = ({
  location,
  current,
  today,
}: CurrentConditionsProps) => (
  <Stack $gap="m">
    <Stack $gap="xs">
      <Stack $direction="row" $align="center" $gap="xs">
        <ConditionIcon condition={current.condition} size="xl" />
        <H1>{toConditionLabel(current.condition)}</H1>
      </Stack>
      <Lead>{current.description}</Lead>
      <P $tone="muted">{summarizeWeather(current, today)}</P>
    </Stack>
    <Stack $direction="row" $align="baseline" $wrap $gap="base">
      <Display>
        <VisuallyHidden>Now </VisuallyHidden>
        {formatTemperature(current.temperature)}
        <VisuallyHidden> Celsius</VisuallyHidden>
      </Display>
      <P>
        High {formatTemperature(today.temperature.max)} · Low{' '}
        {formatTemperature(today.temperature.min)}
      </P>
    </Stack>
    <Stack as="ul" $direction="row" $wrap $gap="xs" aria-label="Details">
      <li>
        <Pill>{formatLocationName(location)}</Pill>
      </li>
      <li>
        <Pill>Humidity {current.humidity}%</Pill>
      </li>
    </Stack>
  </Stack>
);
