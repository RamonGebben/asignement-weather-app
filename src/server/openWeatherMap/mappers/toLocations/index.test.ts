import { describe, expect, it } from 'vitest';
import { geocodingAmsterdam } from '~/server/testing';
import { geocodingSchema } from '../../schemas';
import { toLocations } from '.';

describe('toLocations', () => {
  it('drops repeated places, keeping the best match', () => {
    const locations = toLocations(geocodingSchema.parse(geocodingAmsterdam));

    // The provider returns Amsterdam, North Holland twice.
    expect(
      locations.map(({ name, state, country }) => [name, state, country]),
    ).toEqual([
      ['Amsterdam', 'North Holland', 'NL'],
      ['New Amsterdam Island', 'French Southern and Antarctic Lands', 'FR'],
      ['City of Amsterdam', 'New York', 'US'],
      ['Amsterdam', 'Missouri', 'US'],
    ]);
    expect(locations[0]?.coordinates).toEqual({
      lat: 52.3727598,
      lon: 4.8936041,
    });
  });

  it('keeps an empty result empty', () => {
    expect(toLocations([])).toEqual([]);
  });
});
