'use client';

import styled from 'styled-components';

export const TextInput = styled.input`
  height: 40px;
  min-width: 0;
  padding: 0 ${({ theme }) => theme.spacing('s')};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize('s')};
  color: ${({ theme }) => theme.color('formBackground', 'text')};
  background: ${({ theme }) => theme.color('formBackground')};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid
    ${({ theme }) => theme.color('secondary', 'text')};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.base};

  &:focus-visible {
    outline: ${({ theme }) => theme.getTokens().border?.width.base} solid
      ${({ theme }) => theme.color('tertiary')};
    outline-offset: 2px;
  }
`;
