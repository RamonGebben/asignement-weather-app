import { describe, expect, it } from 'vitest';
import { toBeaufort } from '.';

describe('toBeaufort', () => {
  it.each([
    [0, 0],
    [0.4, 0],
    [0.5, 1],
    [3.3, 2],
    [5.4, 3],
    [7.9, 4],
    [10, 5],
    [13, 6],
    [17, 7],
    [20, 8],
    [24, 9],
    [28, 10],
    [32, 11],
    [32.7, 12],
    [60, 12],
  ])('maps %s m/s to force %s', (speed, force) => {
    expect(toBeaufort(speed)).toBe(force);
  });
});
