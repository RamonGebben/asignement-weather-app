'use client';

import styled from 'styled-components';

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize('m')};
  font-weight: ${({ theme }) => theme.fontWeight('semibold')};
`;
