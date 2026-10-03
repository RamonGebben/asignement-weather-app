'use client';

import type { ReactNode, RefObject } from 'react';
import styled from 'styled-components';
import { GlassPanel } from '~/atoms/GlassPanel';
import { Portal } from '~/atoms/Portal';
import { useElementRect } from '~/hooks/useElementRect';

// A floor under the anchor's width, so a narrow anchor doesn't wrap
// content down to one character per line.
const MIN_WIDTH = '12rem';

const FloatingPanel = styled(GlassPanel)<{
  $top: number;
  $left: number;
  $anchorWidth: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $anchorWidth }) => `max(${$anchorWidth}px, ${MIN_WIDTH})`};
  z-index: ${({ theme }) => theme.zIndex('dropdown')};
`;

export interface DropdownProps {
  /** What to float below. */
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

/** Floats `children` below whatever `anchorRef` points to, in a portal. */
export const Dropdown = ({ anchorRef, children }: DropdownProps) => {
  const rect = useElementRect(anchorRef);
  if (!rect) return null;

  return (
    <Portal>
      <FloatingPanel
        $gap="xs"
        $top={rect.bottom}
        $left={rect.left}
        $anchorWidth={rect.width}
      >
        {children}
      </FloatingPanel>
    </Portal>
  );
};
