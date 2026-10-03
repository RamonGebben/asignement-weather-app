'use client';

import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

/** Lets keyboard users jump past the header; visible only once focused. */
export const SkipLink = styled.a`
  position: absolute;
  top: ${({ theme }) => theme.spacing('xs')};
  left: ${({ theme }) => theme.spacing('xs')};
  z-index: ${({ theme }) => theme.zIndex('toast')};
  padding: ${({ theme }) => theme.spacing('xs')}
    ${({ theme }) => theme.spacing('base')};
  color: ${({ theme }) => theme.color('primary', 'text')};
  background: ${({ theme }) => theme.color('primary')};
  border-radius: ${({ theme }) => theme.borderRadius('base')};
  transform: translateY(-200%);

  &:focus-visible {
    transform: none;
  }

  ${focusRing}
`;
