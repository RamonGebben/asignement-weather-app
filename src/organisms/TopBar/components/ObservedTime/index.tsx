'use client';

import styled from 'styled-components';
import { Skeleton } from '~/atoms/Skeleton';
import { Caption } from '~/atoms/Typography';
import { fadeIn } from '~/theme/fadeIn';
import { formatLocalDate, formatLocalTime } from '~/utils/formatLocalTime';

const FadedCaption = styled(Caption)`
  ${fadeIn}
`;

export interface ObservedTimeProps {
  /** When the shown conditions were observed; omitted while loading. */
  observed?: { at: string; timezoneOffset: number };
}

export const ObservedTime = ({ observed }: ObservedTimeProps) =>
  observed ? (
    <FadedCaption>
      <time dateTime={observed.at}>
        {formatLocalDate(observed.at, observed.timezoneOffset)} ·{' '}
        {formatLocalTime(observed.at, observed.timezoneOffset)}
      </time>
    </FadedCaption>
  ) : (
    <Skeleton $width="7rem" $height="0.875rem" />
  );
