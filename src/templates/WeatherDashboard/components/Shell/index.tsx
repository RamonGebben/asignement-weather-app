'use client';

import type { ReactNode } from 'react';
import { Container } from '~/atoms/Container';
import { SkipLink } from '~/atoms/SkipLink';
import { SkyBackdrop } from '~/atoms/SkyBackdrop';
import { Stack } from '~/atoms/Stack';
import type { TopBarProps } from '~/organisms/TopBar';
import { TopBar } from '~/organisms/TopBar';

const mainId = 'weather';

/**
 * The page chrome every state shares: the sky, skip link, top bar and
 * `<main>`. The sky lives in here, rather than beside it, so the tree keeps
 * its shape as the weather loads. A change of shape would remount the page
 * and lose keyboard focus.
 */
export const Shell = ({
  children,
  sky,
  ...topBar
}: TopBarProps & {
  children: ReactNode;
  /** A CSS background behind the page, once there's weather to show. */
  sky?: string;
}) => (
  <Container $gap="l">
    {sky ? <SkyBackdrop $sky={sky} /> : null}
    <SkipLink href={`#${mainId}`}>Skip to the weather</SkipLink>
    <TopBar {...topBar} />
    <Stack as="main" id={mainId} tabIndex={-1} $gap="l">
      {children}
    </Stack>
  </Container>
);
