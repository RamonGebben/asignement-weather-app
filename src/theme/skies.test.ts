import { describe, expect, it } from 'vitest';
import { skies, toSky } from './skies';

describe('skies', () => {
  it('has a day and a night sky for every condition', () => {
    Object.values(skies).forEach(({ day, night }) => {
      expect(day).toMatch(/^linear-gradient\(/);
      expect(night).toMatch(/^linear-gradient\(/);
    });
  });
});

describe('toSky', () => {
  it('picks the sky for the time of day', () => {
    expect(toSky('rain', true)).toBe(skies.rain.day);
    expect(toSky('rain', false)).toBe(skies.rain.night);
  });
});
