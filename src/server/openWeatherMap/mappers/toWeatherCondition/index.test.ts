import { describe, expect, it } from 'vitest';
import { toWeatherCondition } from '.';

describe('toWeatherCondition', () => {
  it.each([
    // Thunderstorm
    [200, 'storm'],
    [232, 'storm'],
    // Drizzle
    [300, 'rain'],
    [321, 'rain'],
    // Rain
    [500, 'rain'],
    [501, 'rain'],
    [502, 'heavy-rain'],
    [504, 'heavy-rain'],
    [511, 'rain'],
    [520, 'rain'],
    [521, 'rain'],
    [522, 'heavy-rain'],
    [531, 'heavy-rain'],
    // Snow
    [600, 'snow'],
    [622, 'snow'],
    // Atmosphere
    [701, 'fog'],
    [721, 'fog'],
    [741, 'fog'],
    [771, 'fog'],
    [781, 'storm'],
    // Clear & clouds
    [800, 'clear'],
    [801, 'partly-cloudy'],
    [802, 'partly-cloudy'],
    [803, 'cloudy'],
    [804, 'cloudy'],
  ] as const)('maps %s to %s', (id, condition) => {
    expect(toWeatherCondition(id)).toBe(condition);
  });

  it('falls back to cloudy for unknown ids', () => {
    expect(toWeatherCondition(999)).toBe('cloudy');
    expect(toWeatherCondition(100)).toBe('cloudy');
  });
});
