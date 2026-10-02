import { describe, expect, it } from 'vitest';
import { formatPercentage, formatTemperature, formatWindSpeed } from '.';

describe('formatTemperature', () => {
  it.each([
    [20.3, '20°'],
    [20.5, '21°'],
    [-3.6, '-4°'],
    [-0.4, '0°'],
    [0, '0°'],
  ])('formats %s °C as %s', (celsius, formatted) => {
    expect(formatTemperature(celsius)).toBe(formatted);
  });
});

describe('formatWindSpeed', () => {
  it.each([
    [3.13, '11.3 km/h'],
    [0, '0.0 km/h'],
    [10, '36.0 km/h'],
  ])('formats %s m/s as %s', (speed, formatted) => {
    expect(formatWindSpeed(speed)).toBe(formatted);
  });
});

describe('formatPercentage', () => {
  it.each([
    [0, '0%'],
    [0.64, '64%'],
    [1, '100%'],
  ])('formats %s as %s', (fraction, formatted) => {
    expect(formatPercentage(fraction)).toBe(formatted);
  });
});
