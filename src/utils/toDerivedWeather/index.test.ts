import { describe, expect, it } from 'vitest';
import { sampleWeatherReport } from '~/weather/samples';
import { toDerivedWeather } from '.';

describe('toDerivedWeather', () => {
  const now = new Date('2026-10-02T11:30:00.000Z');
  const derived = toDerivedWeather(sampleWeatherReport, now);

  it('records the moment it describes', () => {
    expect(derived.at).toBe('2026-10-02T11:30:00.000Z');
  });

  it('places the sun on its arc', () => {
    expect(derived.sunArc.isDaytime).toBe(true);
    expect(derived.sunArc.progress).toBeCloseTo(0.5, 1);
  });

  it('describes the current wind', () => {
    // 3.13 m/s from 192° in the sample
    expect(derived.wind).toEqual({ compassPoint: 'SSW', beaufort: 2 });
  });

  it('describes the wind for every forecast day', () => {
    expect(derived.forecastWind.map(({ date }) => date)).toEqual(
      sampleWeatherReport.forecast.map(({ date }) => date),
    );
  });
});
