'use client';

import styled from 'styled-components';

export const Message = styled.p<{ $tone?: 'neutral' | 'error' }>`
  font-size: ${({ theme }) => theme.fontSize('xs')};
  color: ${({ $tone = 'neutral', theme }) =>
    $tone === 'error'
      ? theme.color('error', 'emphasis')
      : theme.color('secondary', 'text')};
`;
