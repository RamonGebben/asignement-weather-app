'use client';

import { useState } from 'react';
import { getNeutralSky } from '~/theme/sky';

/**
 * The sky to show before there's a weather report to derive one from: a
 * naive guess from the visitor's own clock, resolved once per mount.
 *
 * The server can't know the visitor's clock, so this can render differently
 * server-side than it does once hydrated - harmless here, since the only
 * thing it drives is `SkyBackdrop`'s decorative background, which is marked
 * `suppressHydrationWarning` for exactly this.
 */
export const useNeutralSky = () => {
  const [sky] = useState(() => getNeutralSky(new Date()));
  return sky;
};
