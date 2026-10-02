'use client';

import styled from 'styled-components';

export const Request = styled.p`
  font-size: ${({ theme }) => theme.fontSize('xs')};
  color: ${({ theme }) => theme.color('secondary', 'text')};
  overflow-wrap: anywhere;
`;
