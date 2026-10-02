'use client';

import styled from 'styled-components';

export const Panels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
  gap: ${({ theme }) => theme.spacing('base')};
  align-items: start;
`;
