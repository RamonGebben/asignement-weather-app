export interface ClientRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
}

/** A viewport-relative rect (`getBoundingClientRect()`) in document coordinates. */
export const toDocumentRect = (
  box: ClientRect,
  scroll: { x: number; y: number },
): ClientRect => ({
  top: box.top + scroll.y,
  bottom: box.bottom + scroll.y,
  left: box.left + scroll.x,
  right: box.right + scroll.x,
  width: box.width,
});
