'use client';

import { getColorMode, setColorMode } from '@pindakaasman/design-system';
import { Icon } from '~/atoms/Icon';
import { Button } from '~/molecules/Button';
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
  <ToggleButton>
    <Button
      $variant="secondary"
      $iconOnly
      iconSlot={
        <>
          <Icon name="sun" />
          <Icon name="moon" />
        </>
      }
      onClick={toggleColorMode}
    >
      Toggle color mode
    </Button>
  </ToggleButton>
);
