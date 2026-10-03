'use client';

import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';
import { toDocumentRect } from './toDocumentRect';

export { toDocumentRect } from './toDocumentRect';
export type { ClientRect } from './toDocumentRect';

/**
 * An element's live bounding box, in document coordinates. Re-measured on
 * window resize and whenever the element's own box changes size.
 */
export const useElementRect = (elementRef: RefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState<ReturnType<typeof toDocumentRect>>();

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateRect = () =>
      setRect(
        toDocumentRect(element.getBoundingClientRect(), {
          x: window.scrollX,
          y: window.scrollY,
        }),
      );
    updateRect();

    window.addEventListener('resize', updateRect);
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(element);

    return () => {
      window.removeEventListener('resize', updateRect);
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return rect;
};
