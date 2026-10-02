import type { Metadata } from 'next';
import { colorModeScript } from '@pindakaasman/design-system';
import { StyledComponentsRegistry } from '~/providers/StyledComponentsRegistry';
import { ThemeProvider } from '~/providers/ThemeProvider';
import { TrpcProvider } from '~/providers/TrpcProvider';
import { fontVariables } from '~/theme/fonts';

export const metadata: Metadata = {
  title: 'Weather',
  description:
    'Current conditions and a five-day forecast, rendered as a procedural 3D world.',
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorModeScript() }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <TrpcProvider>{children}</TrpcProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
