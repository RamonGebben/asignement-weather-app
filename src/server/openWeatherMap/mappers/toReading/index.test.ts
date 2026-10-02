import { describe, expect, it } from 'vitest';
import { currentAmsterdam, forecastAmsterdam } from '~/server/testing';
import { currentWeatherSchema, forecastSchema } from '../../schemas';
import { currentToReading, slotToReading } from '.';

const current = currentWeatherSchema.parse(currentAmsterdam);
const [firstSlot] = forecastSchema.parse(forecastAmsterdam).list;

describe('slotToReading', () => {
  it('maps a 3-hour forecast slot', () => {
    expect(slotToReading(firstSlot!)).toEqual({
      dt: 1790953200,
      isDaytime: true,
      condition: 'partly-cloudy',
      description: 'few clouds',
      icon: '02d',
      min: 20.31,
      max: 20.32,
      pop: 0,
      wind: { speed: 1.35, direction: 236, gust: 3.82 },
    });
  });

  it('reads night slots from the part of day', () => {
    expect(slotToReading({ ...firstSlot!, sys: { pod: 'n' } }).isDaytime).toBe(
      false,
    );
  });
});

describe('currentToReading', () => {
  it('uses the observed temperature, not the station spread', () => {
    expect(currentToReading(current)).toMatchObject({
      dt: 1790950100,
      condition: 'partly-cloudy',
      min: 20.34,
      max: 20.34,
      pop: 0,
    });
  });

  it('is daytime between sunrise and sunset', () => {
    expect(currentToReading(current).isDaytime).toBe(true);
    expect(
      currentToReading({ ...current, dt: current.sys.sunset }).isDaytime,
    ).toBe(false);
    expect(
      currentToReading({ ...current, dt: current.sys.sunrise - 1 }).isDaytime,
    ).toBe(false);
  });
});
