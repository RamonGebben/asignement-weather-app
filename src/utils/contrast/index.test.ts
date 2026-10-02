import { describe, expect, it } from 'vitest';
import { composite, contrastRatio, parseHex, relativeLuminance } from '.';

const black = [0, 0, 0] as const;
const white = [255, 255, 255] as const;

describe('parseHex', () => {
  it('reads #rrggbb in either case', () => {
    expect(parseHex('#ff8000')).toEqual([255, 128, 0]);
    expect(parseHex('#FF8000')).toEqual([255, 128, 0]);
  });

  it('rejects anything else', () => {
    expect(() => parseHex('#f80')).toThrow();
    expect(() => parseHex('red')).toThrow();
  });
});

describe('relativeLuminance', () => {
  it('runs from 0 for black to 1 for white', () => {
    expect(relativeLuminance(black)).toBe(0);
    expect(relativeLuminance(white)).toBe(1);
  });

  it('weighs green far above blue', () => {
    expect(relativeLuminance([0, 255, 0])).toBeGreaterThan(
      relativeLuminance([0, 0, 255]),
    );
  });
});

describe('contrastRatio', () => {
  it('is 21:1 for black on white, either way round', () => {
    expect(contrastRatio(black, white)).toBe(21);
    expect(contrastRatio(white, black)).toBe(21);
  });

  it('is 1:1 for identical colours', () => {
    expect(contrastRatio(white, white)).toBe(1);
  });

  it('matches known WCAG values', () => {
    // #767676 is the lightest grey that passes AA on white.
    expect(contrastRatio(parseHex('#767676'), white)).toBeCloseTo(4.54, 2);
  });
});

describe('composite', () => {
  it('returns the top colour when opaque and the bottom when clear', () => {
    expect(composite(white, black, 1)).toEqual(white);
    expect(composite(white, black, 0)).toEqual(black);
  });

  it('blends the channels in proportion', () => {
    expect(composite(white, black, 0.5)).toEqual([127.5, 127.5, 127.5]);
  });
});
