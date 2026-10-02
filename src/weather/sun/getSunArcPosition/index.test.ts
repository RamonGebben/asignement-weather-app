import { describe, expect, it } from 'vitest';
import { getSunArcPosition } from '.';

const sun = {
  sunrise: '2026-10-02T05:45:00.000Z',
  sunset: '2026-10-02T17:15:00.000Z',
};

describe('getSunArcPosition', () => {
  it('starts the arc at sunrise', () => {
    expect(getSunArcPosition(new Date(sun.sunrise), sun)).toEqual({
      progress: 0,
      isDaytime: true,
    });
  });

  it('is halfway at solar noon', () => {
    expect(
      getSunArcPosition(new Date('2026-10-02T11:30:00.000Z'), sun),
    ).toEqual({ progress: 0.5, isDaytime: true });
  });

  it('ends the arc at sunset', () => {
    expect(getSunArcPosition(new Date(sun.sunset), sun)).toEqual({
      progress: 1,
      isDaytime: true,
    });
  });

  it('clamps before sunrise and reports night', () => {
    expect(
      getSunArcPosition(new Date('2026-10-02T02:00:00.000Z'), sun),
    ).toEqual({ progress: 0, isDaytime: false });
  });

  it('clamps after sunset and reports night', () => {
    expect(
      getSunArcPosition(new Date('2026-10-02T22:00:00.000Z'), sun),
    ).toEqual({ progress: 1, isDaytime: false });
  });

  it('treats a zero-length day (polar night) as night', () => {
    const polar = { sunrise: sun.sunrise, sunset: sun.sunrise };
    expect(getSunArcPosition(new Date(sun.sunrise), polar)).toEqual({
      progress: 0,
      isDaytime: false,
    });
  });
});
