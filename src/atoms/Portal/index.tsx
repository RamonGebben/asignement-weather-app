'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders `children` at the end of `<body>`, escaping every ancestor's own
 * stacking context.
 *
 * Touches `document`, so only render this once mounted on the client (never
 * unconditionally - there's no SSR fallback here).
 */
export const Portal = ({ children }: { children: ReactNode }) =>
  createPortal(children, document.body);
