import { describe, expect, it } from 'vitest';
import { toConditionLabel } from '.';

describe('toConditionLabel', () => {
  it.each([
    ['clear', 'Clear'],
    ['partly-cloudy', 'Partly Cloudy'],
    ['cloudy', 'Cloudy'],
    ['rain', 'Rain'],
    ['heavy-rain', 'Heavy Rain'],
    ['storm', 'Thunderstorms'],
    ['snow', 'Snow'],
    ['fog', 'Fog'],
  ] as const)('labels %s as %s', (condition, label) => {
    expect(toConditionLabel(condition)).toBe(label);
  });
});
