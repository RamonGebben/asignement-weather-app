'use client';

import styled from 'styled-components';

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize('s')};
  font-weight: ${({ theme }) => theme.fontWeight('medium')};
`;
