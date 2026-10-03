'use client';

import styled from 'styled-components';
import { Skeleton } from '~/atoms/Skeleton';
import { Stack } from '~/atoms/Stack';
import { Caption, Lead } from '~/atoms/Typography';
import { fadeIn } from '~/theme/fadeIn';
import { formatLocalDate, formatLocalTime } from '~/utils/formatLocalTime';

export interface ObservedTimeProps {
  /** When the shown conditions were observed; omitted while loading. */
  observed?: { at: string; timezoneOffset: number };
}

/**
 * Labelled "Observed", not just a bare time, the weather provider's last
 * reading, which lags the browser's own clock by a few minutes and runs on
 * the place's local time, not the viewer's.
 */
export const ObservedTime = ({ observed }: ObservedTimeProps) => {
  if (!observed) {
    return (
      <Stack $gap="xxs">
        <Skeleton $width="12rem" $height="1.125rem" />
        <Skeleton $width="10rem" $height="0.875rem" />
      </Stack>
    );
  }

  return (
    <Stack $gap="xxs">
      <FadedTime>
        Observed{' '}
        <time dateTime={observed.at}>
          {formatLocalDate(observed.at, observed.timezoneOffset)} ·{' '}
          {formatLocalTime(observed.at, observed.timezoneOffset)}
        </time>
      </FadedTime>
      <FadedCaption $tone="muted">
        The weather station’s last reading
      </FadedCaption>
    </Stack>
  );
};

const FadedTime = styled(Lead)`
  ${fadeIn}
`;

const FadedCaption = styled(Caption)`
  ${fadeIn}
`;
