'use client';

import styled from 'styled-components';

export const InlineLink = styled.a`
  font-weight: ${({ theme }) => theme.fontWeight('medium')};
  color: ${({ theme }) => theme.color('primary')};
`;
