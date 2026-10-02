import { omit } from 'ramda';
import { describe, expect, it } from 'vitest';
import {
  currentAmsterdam,
  forecastAmsterdam,
  geocodingAmsterdam,
  reverseGeocodingTheHague,
} from '~/server/testing';
import { currentWeatherSchema, forecastSchema, geocodingSchema } from '.';

const current = currentWeatherSchema.parse(currentAmsterdam);
const forecast = forecastSchema.parse(forecastAmsterdam);

describe('currentWeatherSchema', () => {
  it('accepts a recorded response', () => {
    expect(currentWeatherSchema.safeParse(currentAmsterdam).success).toBe(true);
  });

  it('strips fields we do not consume', () => {
    expect(current).not.toHaveProperty('base');
    expect(current.main).not.toHaveProperty('temp_min');
    expect(current.sys).not.toHaveProperty('country');
  });

  it('rejects a response without sun times', () => {
    expect(
      currentWeatherSchema.safeParse({ ...current, sys: {} }).success,
    ).toBe(false);
  });

  it('rejects conditions without a weather entry', () => {
    expect(
      currentWeatherSchema.safeParse({ ...current, weather: [] }).success,
    ).toBe(false);
  });

  it('rejects wrongly typed values', () => {
    const main = { ...current.main, temp: '20.34' };

    expect(currentWeatherSchema.safeParse({ ...current, main }).success).toBe(
      false,
    );
  });

  it('allows visibility to be missing', () => {
    expect(
      currentWeatherSchema.safeParse(omit(['visibility'], current)).success,
    ).toBe(true);
  });
});

describe('forecastSchema', () => {
  it('accepts a recorded response with all 40 slots', () => {
    expect(forecast.list).toHaveLength(40);
    expect(forecast.city.timezone).toBe(7200);
  });

  it('rejects an unknown part of day', () => {
    const [first, ...rest] = forecast.list;
    const list = [{ ...first!, sys: { pod: 'x' } }, ...rest];

    expect(forecastSchema.safeParse({ ...forecast, list }).success).toBe(false);
  });

  it('rejects a probability of precipitation outside 0-1', () => {
    const [first, ...rest] = forecast.list;
    const list = [{ ...first!, pop: 1.2 }, ...rest];

    expect(forecastSchema.safeParse({ ...forecast, list }).success).toBe(false);
  });

  it('rejects a response without city details', () => {
    expect(forecastSchema.safeParse(omit(['city'], forecast)).success).toBe(
      false,
    );
  });
});

describe('geocodingSchema', () => {
  it('accepts recorded responses', () => {
    expect(geocodingSchema.safeParse(geocodingAmsterdam).success).toBe(true);
    expect(geocodingSchema.safeParse(reverseGeocodingTheHague).success).toBe(
      true,
    );
  });

  it('accepts an empty result', () => {
    expect(geocodingSchema.safeParse([]).success).toBe(true);
  });

  it('rejects a hit without coordinates', () => {
    expect(
      geocodingSchema.safeParse([{ name: 'Nowhere', country: 'NL' }]).success,
    ).toBe(false);
  });
});
