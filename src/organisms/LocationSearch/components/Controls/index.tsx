'use client';

import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing('xs')};

  & > input {
    flex: 1 1 16rem;
  }
`;
