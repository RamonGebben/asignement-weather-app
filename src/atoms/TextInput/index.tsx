'use client';

import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

export const TextInput = styled.input`
  /* In a row, grow to fill it, wrapping below 16rem. */
  flex: 1 1 16rem;
  height: 40px;
  min-width: 0;
  padding: 0 ${({ theme }) => theme.spacing('s')};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize('s')};
  color: ${({ theme }) => theme.color('formBackground', 'text')};
  background: ${({ theme }) => theme.color('formBackground')};
  border: ${({ theme }) => theme.borderWidth('s')} solid
    ${({ theme }) => theme.color('secondary', 'text')};
  border-radius: ${({ theme }) => theme.borderRadius('base')};

  ${focusRing}
`;
