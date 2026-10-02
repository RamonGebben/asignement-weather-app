import { describe, expect, it } from 'vitest';
import { toWind } from '.';

describe('toWind', () => {
  it('maps speed, direction and gust', () => {
    expect(toWind({ speed: 4.02, deg: 183, gust: 5.36 })).toEqual({
      speed: 4.02,
      direction: 183,
      gust: 5.36,
    });
  });

  it('leaves gust out when the provider does not report it', () => {
    expect(toWind({ speed: 1, deg: 90 })).toEqual({ speed: 1, direction: 90 });
  });
});
