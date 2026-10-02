'use client';

import type { SystemSize } from '@pindakaasman/design-system';
import styled from 'styled-components';

export interface GridProps {
  /** Columns never get narrower than this; as many fit as the width allows. */
  $minColumnWidth?: string;
  /** Space between cells, from the spacing scale. Defaults to `base`. */
  $gap?: SystemSize;
}

/** A responsive grid of equal columns that reflows without breakpoints. */
export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      min(100%, ${({ $minColumnWidth = '18rem' }) => $minColumnWidth}),
      1fr
    )
  );
  gap: ${({ $gap = 'base', theme }) => theme.spacing($gap)};
  align-items: start;
`;
