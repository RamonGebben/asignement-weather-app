'use client';

import styled from 'styled-components';

interface SkyBackdropProps {
  /** Any CSS background, e.g. one of the theme's `skies`. */
  $sky: string;
}

/**
 * Fills the viewport behind the page with a sky. It stays put while the
 * content scrolls, sits below it and lets clicks through. Decorative only:
 * render it `aria-hidden`, since the weather is in the page's text. The sky
 * goes in an inline style, so each new sky doesn't generate a CSS class.
 */
export const SkyBackdrop = styled.div.attrs<SkyBackdropProps>(({ $sky }) => ({
  'aria-hidden': true,
  style: { background: $sky },
}))`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;
