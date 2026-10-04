import type { Metadata } from 'next';
import { colorModeScript } from '@pindakaasman/design-system';
import { StyledComponentsRegistry } from '~/providers/StyledComponentsRegistry';
import { ThemeProvider } from '~/providers/ThemeProvider';
import { TrpcProvider } from '~/providers/TrpcProvider';
import { fontVariables } from '~/theme/fonts';

const title = 'Weather';
const description = 'Current conditions and a five-day forecast.';

export const metadata: Metadata = {
  metadataBase: new URL('https://sopra-steria-weather-app.vercel.app/'),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
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
