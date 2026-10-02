'use client';

import styled from 'styled-components';
import { Stack } from '../Stack';

/** Centres page content at a readable width, with responsive side padding. */
export const Container = styled(Stack)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing('l')}
    ${({ theme }) => theme.spacing('m')};

  ${({ theme }) => theme.mq.lessThan('tablet')`
    padding: ${theme.spacing('m')} ${theme.spacing('base')};
  `}
`;
