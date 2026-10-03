'use client';

import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

export const ResultButton = styled.button.attrs({ type: 'button' })`
  width: 100%;
  padding: ${({ theme }) => theme.spacing('xs')}
    ${({ theme }) => theme.spacing('s')};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize('s')};
  text-align: left;
  color: inherit;
  background: transparent;
  border: ${({ theme }) => theme.borderWidth('s')} solid
    ${({ theme }) => theme.color('secondary')};
  border-radius: ${({ theme }) => theme.borderRadius('base')};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.color('secondary')};
    }
  }

  ${focusRing}
`;
