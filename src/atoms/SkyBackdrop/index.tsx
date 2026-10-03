'use client';

import styled from 'styled-components';

interface SkyBackdropProps {
  /** Any CSS background, e.g. one of the theme's `skies`. */
  $sky: string;
}

/**
 * Fills the viewport behind the page with a sky. It stays put while the
 * content scrolls, sits below it and lets clicks through. Decorative only:
 * render it `aria-hidden`, since the weather is in the page's text.
 *
 * The background transitions, so swapping skies fades rather than snaps -
 * except into or out of the golden-hour glow (`toSky`), whose extra gradient
 * layer browsers can't interpolate. `suppressHydrationWarning` covers the
 * neutral sky's clock-based guess (`useNeutralSky`), which can legitimately
 * differ between the server render and the client's first one.
 */
export const SkyBackdrop = styled.div.attrs<SkyBackdropProps>(({ $sky }) => ({
  'aria-hidden': true,
  suppressHydrationWarning: true,
  style: { background: $sky },
}))`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transition: background 1s ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
