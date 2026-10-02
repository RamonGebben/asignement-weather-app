'use client';

import type { SystemSize } from '@pindakaasman/design-system';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export interface StackProps {
  /** Defaults to `column`. */
  $direction?: 'column' | 'row';
  /** Space between children, from the spacing scale. Defaults to `base`. */
  $gap?: SystemSize;
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
  /** Let children wrap onto new lines. */
  $wrap?: boolean;
}

/**
 * Lays children out in one direction with even spacing. Render it as any
 * element with `as` - a `form`, `ul`, `section`, ...
 */
export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ $direction = 'column' }) => $direction};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${({ $gap = 'base', theme }) => theme.spacing($gap)};
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  /* Harmless on other elements; lists rendered as a Stack lose bullets. */
  list-style: none;
`;
