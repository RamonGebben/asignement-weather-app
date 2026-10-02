'use client';

import styled from 'styled-components';

export const Lead = styled.p`
  max-width: 440px;
  font-size: ${({ theme }) => theme.fontSize('base')};
  line-height: ${({ theme }) => theme.lineHeight('loose')};
  text-wrap: balance;
  color: ${({ theme }) => theme.color('secondary', 'text')};
`;
