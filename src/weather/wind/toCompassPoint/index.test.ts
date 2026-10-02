import { describe, expect, it } from 'vitest';
import { toCompassPoint } from '.';

describe('toCompassPoint', () => {
  it.each([
    [0, 'N'],
    [22.5, 'NNE'],
    [45, 'NE'],
    [90, 'E'],
    [180, 'S'],
    [270, 'W'],
    [337.5, 'NNW'],
  ] as const)('maps %s° to %s', (degrees, point) => {
    expect(toCompassPoint(degrees)).toBe(point);
  });

  it('rounds to the nearest sector', () => {
    expect(toCompassPoint(11)).toBe('N');
    expect(toCompassPoint(12)).toBe('NNE');
  });

  it('wraps values at and beyond 360°', () => {
    expect(toCompassPoint(355)).toBe('N');
    expect(toCompassPoint(360)).toBe('N');
    expect(toCompassPoint(450)).toBe('E');
  });

  it('handles negative degrees', () => {
    expect(toCompassPoint(-90)).toBe('W');
  });
});
