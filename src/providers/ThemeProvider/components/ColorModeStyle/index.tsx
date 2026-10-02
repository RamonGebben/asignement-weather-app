'use client';

import { createGlobalStyle } from 'styled-components';

export const ColorModeStyle = createGlobalStyle`
  ${({ theme }) => theme.colorModeCss()}
`;
