'use client';

import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize('l')};
  font-weight: ${({ theme }) => theme.fontWeight('semibold')};
  line-height: ${({ theme }) => theme.getTokens().type.lineHeight.tight};
`;
