'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: ${({ theme }) => theme.spacing('m')};

  ${({ theme }) => theme.mq.lessThan('tablet')`
    gap: ${theme.spacing('base')};
  `}
`;
