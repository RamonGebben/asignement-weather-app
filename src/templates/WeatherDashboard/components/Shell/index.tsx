'use client';

import type { ReactNode } from 'react';
import { Container } from '~/atoms/Container';
import { SkipLink } from '~/atoms/SkipLink';
import { Stack } from '~/atoms/Stack';
import type { TopBarProps } from '~/organisms/TopBar';
import { TopBar } from '~/organisms/TopBar';

const mainId = 'weather';

/** The page chrome every state shares: skip link, top bar and `<main>`. */
export const Shell = ({
  children,
  ...topBar
}: TopBarProps & { children: ReactNode }) => (
  <Container $gap="l">
    <SkipLink href={`#${mainId}`}>Skip to the weather</SkipLink>
    <TopBar {...topBar} />
    <Stack as="main" id={mainId} tabIndex={-1} $gap="l">
      {children}
    </Stack>
  </Container>
);
