'use client';

import styled from 'styled-components';

export const Lead = styled.p`
  font-size: ${({ theme }) => theme.fontSize('base')};
  color: ${({ theme }) => theme.color('secondary', 'text')};
`;
