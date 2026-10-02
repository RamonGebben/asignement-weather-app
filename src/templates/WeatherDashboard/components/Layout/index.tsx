'use client';

import styled from 'styled-components';

/** Hero and side column above the forecast; one column on narrow screens. */
export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);
  grid-template-areas:
    'hero side'
    'forecast forecast';
  gap: ${({ theme }) => theme.spacing('l')};

  ${({ theme }) => theme.mq.lessThan('tabletLandscape')`
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'hero'
      'side'
      'forecast';
  `}
`;
