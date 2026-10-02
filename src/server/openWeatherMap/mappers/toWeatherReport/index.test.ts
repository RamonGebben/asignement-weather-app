import { describe, expect, it } from 'vitest';
import { currentAmsterdam, forecastAmsterdam } from '~/server/testing';
import { currentWeatherSchema, forecastSchema } from '../../schemas';
import { toWeatherReport } from '.';

const current = currentWeatherSchema.parse(currentAmsterdam);
const forecast = forecastSchema.parse(forecastAmsterdam);
const hour = 3600;

describe('toWeatherReport', () => {
  it('maps the location and its UTC offset', () => {
    const report = toWeatherReport(current, forecast);

    expect(report.coordinates).toEqual({ lat: 52.374, lon: 4.8897 });
    expect(report.timezoneOffset).toBe(7200);
    expect(report.current.temperature).toBe(20.34);
  });

  it('builds today from the current observation and the rest of the day', () => {
    expect(toWeatherReport(current, forecast).today).toEqual({
      date: '2026-10-02',
      condition: 'partly-cloudy',
      description: 'scattered clouds',
      icon: '03d',
      // The low comes from tonight's slots, the high from right now.
      temperature: { min: 12.93, max: 20.34 },
      precipitationProbability: 0,
      wind: { speed: 4.02, direction: 183, gust: 5.36 },
    });
  });

  it('forecasts the next five days', () => {
    const report = toWeatherReport(current, forecast);

    expect(
      report.forecast.map(({ date, condition, temperature }) => [
        date,
        condition,
        temperature.min,
        temperature.max,
      ]),
    ).toEqual([
      ['2026-10-03', 'cloudy', 10.77, 20.67],
      ['2026-10-04', 'rain', 12.81, 17.49],
      ['2026-10-05', 'cloudy', 11.78, 18.51],
      ['2026-10-06', 'rain', 13.7, 18.44],
      ['2026-10-07', 'cloudy', 10.72, 17.01],
    ]);
  });

  it('carries each day’s rain chance and strongest wind', () => {
    const [, rainy, windy] = toWeatherReport(current, forecast).forecast;

    expect(rainy?.precipitationProbability).toBe(0.24);
    expect(windy?.wind).toEqual({ speed: 4.36, direction: 239, gust: 10.04 });
  });

  it('ignores forecast slots that are already in the past', () => {
    const later = { ...current, dt: current.dt + 6 * hour };
    const report = toWeatherReport(later, forecast);

    // 22:08 local: only tonight's 23:00 slot is still ahead.
    expect(report.today.temperature.max).toBe(20.34);
    expect(report.today.temperature.min).toBe(12.93);
  });

  it('drops a final day with too few slots to describe it', () => {
    // Cut the forecast so the last local day only has its first two slots.
    const lastFullSlot = forecast.list.findIndex(
      ({ dt }) => dt === Date.UTC(2026, 9, 6, 3) / 1000,
    );
    const short = {
      ...forecast,
      list: forecast.list.slice(0, lastFullSlot + 1),
    };

    expect(
      toWeatherReport(current, short).forecast.map(({ date }) => date),
    ).toEqual(['2026-10-03', '2026-10-04', '2026-10-05']);
  });

  it('still describes today when no forecast slots are left for it', () => {
    const report = toWeatherReport(current, { ...forecast, list: [] });

    expect(report.today).toMatchObject({
      date: '2026-10-02',
      condition: 'partly-cloudy',
      temperature: { min: 20.34, max: 20.34 },
    });
    expect(report.forecast).toEqual([]);
  });
});
