import { describe, expect, it } from 'vitest';
import { currentAmsterdam } from '~/server/testing';
import { currentWeatherSchema } from '../../schemas';
import { toCurrentWeather } from '.';

const current = currentWeatherSchema.parse(currentAmsterdam);

describe('toCurrentWeather', () => {
  it('maps the current observation', () => {
    expect(toCurrentWeather(current)).toEqual({
      observedAt: '2026-10-02T14:08:20.000Z',
      condition: 'partly-cloudy',
      description: 'scattered clouds',
      icon: '03d',
      temperature: 20.34,
      feelsLike: 20.05,
      humidity: 62,
      pressure: 1031,
      cloudiness: 32,
      visibility: 10000,
      precipitation: { rain: 0, snow: 0 },
      wind: { speed: 4.02, direction: 183, gust: 5.36 },
      sun: {
        sunrise: '2026-10-02T05:42:42.000Z',
        sunset: '2026-10-02T17:16:50.000Z',
      },
    });
  });

  it('reads rain and snow volumes when present', () => {
    const wet = { ...current, rain: { '1h': 2.4 }, snow: { '1h': 0.3 } };

    expect(toCurrentWeather(wet).precipitation).toEqual({
      rain: 2.4,
      snow: 0.3,
    });
  });

  it('falls back to maximum visibility when it is not reported', () => {
    const { visibility, ...withoutVisibility } = current;

    expect(visibility).toBe(10000);
    expect(toCurrentWeather(withoutVisibility).visibility).toBe(10000);
  });
});
