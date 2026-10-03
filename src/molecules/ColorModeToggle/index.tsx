'use client';

import { getColorMode, setColorMode } from '@pindakaasman/design-system';
import { Icon } from '~/atoms/Icon';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import { ToggleButton } from './components/ToggleButton';

/**
 * Flips to the opposite of the OS preference, or back to it on a second
 * click, so there's always a way back to the default without clearing
 * localStorage by hand.
 */
const toggleColorMode = () => {
  const current = getColorMode();

  if (current !== 'system') {
    setColorMode('system');
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setColorMode(prefersDark ? 'light' : 'dark');
};

export const ColorModeToggle = () => (
  <ToggleButton onClick={toggleColorMode}>
    <Icon name="sun" />
    <Icon name="moon" />
    <VisuallyHidden>Toggle color mode</VisuallyHidden>
  </ToggleButton>
);
