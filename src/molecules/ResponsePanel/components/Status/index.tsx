'use client';

import styled from 'styled-components';

export const Status = styled.p<{ $tone?: 'neutral' | 'error' }>`
  font-size: ${({ theme }) => theme.fontSize('xs')};
  color: ${({ $tone = 'neutral', theme }) =>
    $tone === 'error'
      ? theme.color('error')
      : theme.color('secondary', 'text')};
`;
