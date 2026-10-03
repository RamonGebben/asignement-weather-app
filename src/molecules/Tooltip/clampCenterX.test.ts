import { describe, expect, it } from 'vitest';
import { clampCenterX } from './clampCenterX';

describe('clampCenterX', () => {
  it('leaves the center alone when the tooltip comfortably fits', () => {
    expect(clampCenterX(200, { left: 0, width: 400 }, 256)).toBe(200);
  });

  it('pulls the center in from the left edge', () => {
    expect(clampCenterX(10, { left: 0, width: 400 }, 256)).toBe(136);
  });

  it('pulls the center in from the right edge', () => {
    expect(clampCenterX(390, { left: 0, width: 400 }, 256)).toBe(264);
  });

  it('centers on the viewport when the tooltip is wider than it', () => {
    expect(clampCenterX(50, { left: 0, width: 200 }, 256)).toBe(100);
  });

  it('shifts the clamp bounds with a scrolled viewport', () => {
    // Same geometry as the left-edge case, scrolled 1000px right - the
    // anchor and the clamp bounds move together.
    expect(clampCenterX(1010, { left: 1000, width: 400 }, 256)).toBe(1136);
  });
});
