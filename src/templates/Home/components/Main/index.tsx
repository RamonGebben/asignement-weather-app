'use client';

import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color('background')};
  padding: calc(${({ theme }) => theme.spacing('xl')} * 2)
    ${({ theme }) => theme.spacing('xl')};

  ${({ theme }) => theme.mq.lessThan('tablet')`
    padding: ${theme.spacing('l')} ${theme.spacing('m')};
  `}
`;
