import { describe, expect, it } from 'vitest';
import { skies, toSky } from '.';

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
