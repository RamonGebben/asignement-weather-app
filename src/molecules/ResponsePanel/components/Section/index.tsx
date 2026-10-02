'use client';

import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing('s')};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing('base')};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid
    ${({ theme }) => theme.color('secondary')};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.base};
`;
