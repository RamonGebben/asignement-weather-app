'use client';

import styled from 'styled-components';

export const Title = styled.h1`
  max-width: 320px;
  font-size: ${({ theme }) => theme.fontSize('xl')};
  font-weight: ${({ theme }) => theme.fontWeight('semibold')};
  line-height: ${({ theme }) => theme.lineHeight('tight')};
  letter-spacing: -0.06em;
  text-wrap: balance;
  color: ${({ theme }) => theme.color('primary')};

  ${({ theme }) => theme.mq.lessThan('tablet')`
    font-size: ${theme.fontSize('l')};
  `}
`;
