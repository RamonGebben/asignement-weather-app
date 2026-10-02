'use client';

import type { ReactNode } from 'react';
import { Stack } from '~/atoms/Stack';
import { Caption, P } from '~/atoms/Typography';

export interface Stat {
  label: string;
  value: ReactNode;
}

/** Labelled readings as a description list, so each value keeps its label. */
export const StatList = ({ stats }: { stats: Array<Stat> }) => (
  <Stack as="dl" $gap="xs">
    {stats.map(({ label, value }) => (
      <Stack
        key={label}
        $direction="row"
        $justify="space-between"
        $align="baseline"
        $gap="s"
      >
        <Caption as="dt" $tone="muted">
          {label}
        </Caption>
        <P as="dd">{value}</P>
      </Stack>
    ))}
  </Stack>
);
