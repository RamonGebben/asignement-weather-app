'use client';

import type { ReactNode, RefObject } from 'react';
import styled from 'styled-components';
import { GlassPanel } from '~/atoms/GlassPanel';
import { Portal } from '~/atoms/Portal';
import { useElementRect } from '~/hooks/useElementRect';
import { fadeIn } from '~/theme/fadeIn';
import { clampCenterX } from './clampCenterX';

const MAX_WIDTH_PX = 256;

const FloatingTooltip = styled(GlassPanel)<{ $top: number; $left: number }>`
  position: absolute;
  top: ${({ $top, theme }) => `calc(${$top}px - ${theme.space('xxs')})`};
  left: ${({ $left }) => $left}px;
  transform: translate(-50%, -100%);
  width: max-content;
  max-width: ${MAX_WIDTH_PX}px;
  padding: ${({ theme }) => theme.spacing('xxs')}
    ${({ theme }) => theme.spacing('xs')};
  border-radius: ${({ theme }) => theme.borderRadius('base')};
  z-index: ${({ theme }) => theme.zIndex('dropdown')};

  ${fadeIn}
`;

export interface TooltipProps {
  /** Element ref to float above, centered on it. */
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export const Tooltip = ({ anchorRef, children }: TooltipProps) => {
  const rect = useElementRect(anchorRef);
  if (!rect) return null;

  const centerX = clampCenterX(
    rect.left + rect.width / 2,
    { left: window.scrollX, width: window.innerWidth },
    MAX_WIDTH_PX,
  );

  return (
    <Portal>
      <FloatingTooltip $gap="xxs" $top={rect.top} $left={centerX}>
        {children}
      </FloatingTooltip>
    </Portal>
  );
};
