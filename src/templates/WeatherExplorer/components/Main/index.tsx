'use client';

import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing('m')};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing('l')}
    ${({ theme }) => theme.spacing('m')};
  font-family: ${({ theme }) => theme.getTokens().type.fontFamily.sans};

  ${({ theme }) => theme.mq.lessThan('tablet')`
    padding: ${theme.spacing('m')} ${theme.spacing('base')};
  `}
`;
