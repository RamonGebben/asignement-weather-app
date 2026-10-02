import { describe, expect, it } from 'vitest';
import type { Reading } from '../toReading';
import { toDailyForecasts } from '.';

const hour = 3600;
// 3 October 2026, 00:00 UTC
const midnight = Date.UTC(2026, 9, 3) / 1000;

const reading = (overrides: Partial<Reading> = {}): Reading => ({
  dt: midnight,
  isDaytime: true,
  condition: 'clear',
  description: 'clear sky',
  icon: '01d',
  min: 10,
  max: 12,
  pop: 0,
  wind: { speed: 2, direction: 180 },
  ...overrides,
});

describe('toDailyForecasts', () => {
  it('groups readings by local date, oldest first', () => {
    const days = toDailyForecasts(
      [
        reading({ dt: midnight + 9 * hour }),
        reading({ dt: midnight - 3 * hour }),
        reading({ dt: midnight + 3 * hour }),
      ],
      0,
    );

    expect(days.map(({ date }) => date)).toEqual(['2026-10-02', '2026-10-03']);
  });

  it('groups by the location offset rather than UTC', () => {
    // 22:00 UTC on the 2nd is already the 3rd at UTC+2.
    const days = toDailyForecasts(
      [reading({ dt: midnight - 2 * hour }), reading({ dt: midnight + hour })],
      2 * hour,
    );

    expect(days.map(({ date }) => date)).toEqual(['2026-10-03']);
  });

  it('spans the lowest minimum to the highest maximum', () => {
    const [day] = toDailyForecasts(
      [
        reading({ min: 8, max: 11 }),
        reading({ dt: midnight + 3 * hour, min: 9, max: 16 }),
      ],
      0,
    );

    expect(day?.temperature).toEqual({ min: 8, max: 16 });
  });

  it('takes the highest chance of precipitation', () => {
    const [day] = toDailyForecasts(
      [reading({ pop: 0.2 }), reading({ dt: midnight + 3 * hour, pop: 0.7 })],
      0,
    );

    expect(day?.precipitationProbability).toBe(0.7);
  });

  it('describes the day by its daytime readings', () => {
    const [day] = toDailyForecasts(
      [
        reading({ isDaytime: false, condition: 'rain' }),
        reading({
          dt: midnight + 3 * hour,
          isDaytime: false,
          condition: 'rain',
        }),
        reading({
          dt: midnight + 12 * hour,
          condition: 'cloudy',
          description: 'overcast clouds',
          icon: '04d',
        }),
      ],
      0,
    );

    expect(day).toMatchObject({
      condition: 'cloudy',
      description: 'overcast clouds',
      icon: '04d',
    });
  });

  it('falls back to night readings when a day has no daytime', () => {
    const [day] = toDailyForecasts(
      [reading({ isDaytime: false, condition: 'snow', icon: '13n' })],
      0,
    );

    expect(day).toMatchObject({ condition: 'snow', icon: '13n' });
  });

  it('reports the strongest wind and the strongest gust', () => {
    const [day] = toDailyForecasts(
      [
        reading({ wind: { speed: 3, direction: 90, gust: 9 } }),
        reading({
          dt: midnight + 3 * hour,
          wind: { speed: 5, direction: 270, gust: 7 },
        }),
      ],
      0,
    );

    expect(day?.wind).toEqual({ speed: 5, direction: 270, gust: 9 });
  });

  it('leaves out gusts when none were reported', () => {
    const [day] = toDailyForecasts([reading()], 0);

    expect(day?.wind).toEqual({ speed: 2, direction: 180 });
  });

  it('returns no days without readings', () => {
    expect(toDailyForecasts([], 0)).toEqual([]);
  });
});
