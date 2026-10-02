import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Class names that define the CSS variables the theme's fontFamily tokens read.
// Apply to the root element of anything rendering themed components.
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
