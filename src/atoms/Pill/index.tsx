'use client';

import styled from 'styled-components';
import { Caption } from '../Typography';

/** A short fact in a rounded outline, e.g. a place or a reading. */
export const Pill = styled(Caption)`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing('xxs')}
    ${({ theme }) => theme.spacing('s')};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid currentColor;
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.full};
`;
