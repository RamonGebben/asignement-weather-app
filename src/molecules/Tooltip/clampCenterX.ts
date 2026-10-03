const EDGE_MARGIN = 8;

export interface ViewportSpan {
  /** The viewport's left edge, in the same (document) coordinate space as `centerX`. */
  left: number;
  width: number;
}

/**
 * Clamps the x a tooltip centers on, so a box up to `maxWidth` wide stays
 * on-screen. `centerX` and `viewport.left` must both be document-relative
 * (include scroll), or the bounds drift from the value they're clamping.
 */
export const clampCenterX = (
  centerX: number,
  viewport: ViewportSpan,
  maxWidth: number,
) => {
  const halfWidth = maxWidth / 2;
  const min = viewport.left + halfWidth + EDGE_MARGIN;
  const max = viewport.left + viewport.width - halfWidth - EDGE_MARGIN;
  // The viewport is narrower than the tooltip itself - centering it on the
  // viewport is the closest thing to correct.
  if (max < min) return viewport.left + viewport.width / 2;
  return Math.min(Math.max(centerX, min), max);
};
