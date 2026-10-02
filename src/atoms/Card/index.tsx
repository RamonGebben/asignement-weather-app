'use client';

import styled from 'styled-components';
import { Stack } from '../Stack';

/** A bordered, padded group of content. Layout props come from `Stack`. */
export const Card = styled(Stack)`
  min-width: 0;
  padding: ${({ theme }) => theme.spacing('base')};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid
    ${({ theme }) => theme.color('secondary')};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.base};
`;
