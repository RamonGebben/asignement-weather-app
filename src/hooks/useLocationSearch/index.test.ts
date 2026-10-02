import { describe, expect, it } from 'vitest';
import { toPositionLocation } from '.';

const coordinates = { lat: 52.0799, lon: 4.3113 };

describe('toPositionLocation', () => {
  it('names the position after the nearest place, keeping its coordinates', () => {
    expect(
      toPositionLocation(coordinates, {
        name: 'The Hague',
        country: 'NL',
        state: 'South Holland',
        coordinates: { lat: 52.08, lon: 4.31 },
      }),
    ).toEqual({
      name: 'The Hague',
      country: 'NL',
      state: 'South Holland',
      coordinates,
    });
  });

  it('falls back to a generic name where there is no place', () => {
    expect(toPositionLocation(coordinates, null)).toEqual({
      name: 'Your location',
      country: '',
      coordinates,
    });
  });
});
