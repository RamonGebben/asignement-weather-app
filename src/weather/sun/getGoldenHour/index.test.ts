import { describe, expect, it } from 'vitest';
import { getGoldenHour } from '.';

const sun = {
  sunrise: '2026-10-02T05:45:00.000Z',
  sunset: '2026-10-02T17:15:00.000Z',
};
const at = (iso: string) => getGoldenHour(new Date(iso), sun);

describe('getGoldenHour', () => {
  it('is strongest at sunrise and sunset', () => {
    expect(at(sun.sunrise)).toEqual({ strength: 1, phase: 'sunrise' });
    expect(at(sun.sunset)).toEqual({ strength: 1, phase: 'sunset' });
  });

  it('fades over 90 minutes, before and after', () => {
    expect(at('2026-10-02T06:30:00.000Z').strength).toBeCloseTo(0.5);
    expect(at('2026-10-02T05:00:00.000Z').strength).toBeCloseTo(0.5);
    expect(at('2026-10-02T17:15:00.000Z').phase).toBe('sunset');
  });

  it('is gone in the middle of the day and the night', () => {
    expect(at('2026-10-02T11:30:00.000Z').strength).toBe(0);
    expect(at('2026-10-02T23:00:00.000Z').strength).toBe(0);
  });
});
