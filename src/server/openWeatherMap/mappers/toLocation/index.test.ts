import { describe, expect, it } from 'vitest';
import { geocodingAmsterdam, reverseGeocodingTheHague } from '~/server/testing';
import { geocodingSchema } from '../../schemas';
import { toLocation } from '.';

const [amsterdam] = geocodingSchema.parse(geocodingAmsterdam);
const [theHague] = geocodingSchema.parse(reverseGeocodingTheHague);

describe('toLocation', () => {
  it('maps a geocoding hit', () => {
    expect(toLocation(amsterdam!)).toEqual({
      name: 'Amsterdam',
      country: 'NL',
      state: 'North Holland',
      coordinates: { lat: 52.3727598, lon: 4.8936041 },
    });
  });

  it('prefers the English local name', () => {
    expect(toLocation({ ...theHague!, name: 'Den Haag' }).name).toBe(
      'The Hague',
    );
  });

  it('falls back to the default name without local names', () => {
    expect(
      toLocation({ name: 'Zwolle', lat: 52.5, lon: 6.08, country: 'NL' }),
    ).toEqual({
      name: 'Zwolle',
      country: 'NL',
      coordinates: { lat: 52.5, lon: 6.08 },
    });
  });
});
