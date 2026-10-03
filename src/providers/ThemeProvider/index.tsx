'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '~/theme';
import { GlobalStyle } from './components/GlobalStyle';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledThemeProvider theme={() => theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
