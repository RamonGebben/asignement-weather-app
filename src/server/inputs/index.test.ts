import { describe, expect, it } from 'vitest';
import { coordinatesInput, locationSearchInput } from '.';

describe('coordinatesInput', () => {
  it('rounds to two decimals', () => {
    expect(
      coordinatesInput.parse({ lat: 52.3727598, lon: -4.8936041 }),
    ).toEqual({ lat: 52.37, lon: -4.89 });
  });

  it.each([
    { lat: 90.01, lon: 0 },
    { lat: -90.01, lon: 0 },
    { lat: 0, lon: 180.01 },
    { lat: 0, lon: -180.01 },
    { lat: Number.NaN, lon: 0 },
  ])('rejects out-of-range %o', coordinates => {
    expect(coordinatesInput.safeParse(coordinates).success).toBe(false);
  });

  it('accepts the poles and the antimeridian', () => {
    expect(coordinatesInput.parse({ lat: -90, lon: 180 })).toEqual({
      lat: -90,
      lon: 180,
    });
  });
});

describe('locationSearchInput', () => {
  it('trims the query and defaults the limit', () => {
    expect(locationSearchInput.parse({ query: '  Utrecht ' })).toEqual({
      query: 'Utrecht',
      limit: 5,
    });
  });

  it.each(['', ' a ', 'x'.repeat(101)])('rejects the query %j', query => {
    expect(locationSearchInput.safeParse({ query }).success).toBe(false);
  });

  it.each([0, 6, 2.5])('rejects the limit %s', limit => {
    expect(
      locationSearchInput.safeParse({ query: 'Utrecht', limit }).success,
    ).toBe(false);
  });
});
