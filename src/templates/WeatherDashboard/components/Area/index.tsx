'use client';

import styled from 'styled-components';

/** A named cell of the dashboard `Layout`. */
export const Area = styled.div<{ $area: 'hero' | 'side' | 'forecast' }>`
  grid-area: ${({ $area }) => $area};
  min-width: 0;
`;
