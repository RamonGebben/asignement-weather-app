import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { fontVariables } from '../src/theme/fonts';

// Mirror the root layout: the theme's fontFamily tokens read CSS variables
// defined by these classes, and the global body styles need them on <html>.
document.documentElement.classList.add(...fontVariables.split(' '));

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
