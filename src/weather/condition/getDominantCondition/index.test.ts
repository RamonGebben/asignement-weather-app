import { describe, expect, it } from 'vitest';
import { getDominantCondition } from '.';

describe('getDominantCondition', () => {
  it('picks the most frequent condition', () => {
    expect(
      getDominantCondition(['clear', 'cloudy', 'cloudy', 'rain', 'cloudy']),
    ).toBe('cloudy');
  });

  it('breaks ties towards the more severe condition', () => {
    expect(getDominantCondition(['clear', 'rain', 'rain', 'clear'])).toBe(
      'rain',
    );
    expect(getDominantCondition(['storm', 'heavy-rain'])).toBe('storm');
    expect(getDominantCondition(['partly-cloudy', 'clear'])).toBe(
      'partly-cloudy',
    );
  });

  it('returns the only condition', () => {
    expect(getDominantCondition(['snow'])).toBe('snow');
  });

  it('returns undefined without conditions', () => {
    expect(getDominantCondition([])).toBeUndefined();
  });
});
