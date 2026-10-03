import { describe, expect, it } from 'vitest';
import { getNeutralSky, isNaiveDaytime, neutralSky, skies, toSky } from '.';

const noGlow = { strength: 0, phase: 'sunrise' } as const;

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
    expect(
      toSky({ condition: 'rain', isDaytime: true, goldenHour: noGlow }),
    ).toBe(skies.rain.day);
    expect(
      toSky({ condition: 'rain', isDaytime: false, goldenHour: noGlow }),
    ).toBe(skies.rain.night);
  });

  it('lays a warm glow over the sky around sunset', () => {
    const sky = toSky({
      condition: 'clear',
      isDaytime: true,
      goldenHour: { strength: 1, phase: 'sunset' },
    });
    expect(sky).toBe(
      `linear-gradient(to top, rgb(255 128 64 / 0.65), rgb(255 128 64 / 0) 70%), ${skies.clear.day}`,
    );
  });

  it('lets less of the glow through heavier weather', () => {
    const opacityOf = (sky: string) => Number(/\/ ([\d.]+)\)/.exec(sky)?.[1]);
    const goldenHour = { strength: 1, phase: 'sunrise' } as const;

    expect(
      opacityOf(toSky({ condition: 'storm', isDaytime: true, goldenHour })),
    ).toBeLessThan(
      opacityOf(toSky({ condition: 'clear', isDaytime: true, goldenHour })),
    );
  });
});

describe('isNaiveDaytime', () => {
  it('treats 6am up to (not including) 8pm local time as daytime', () => {
    expect(isNaiveDaytime(new Date('2026-06-15T06:00:00'))).toBe(true);
    expect(isNaiveDaytime(new Date('2026-06-15T19:59:00'))).toBe(true);
    expect(isNaiveDaytime(new Date('2026-06-15T20:00:00'))).toBe(false);
    expect(isNaiveDaytime(new Date('2026-06-15T05:59:00'))).toBe(false);
  });
});

describe('getNeutralSky', () => {
  it('picks the neutral day or night sky from the naive guess', () => {
    expect(getNeutralSky(new Date('2026-06-15T12:00:00'))).toBe(neutralSky.day);
    expect(getNeutralSky(new Date('2026-06-15T23:00:00'))).toBe(
      neutralSky.night,
    );
  });
});
