import { describe, expect, it } from 'vitest';
import { formatLocationName } from '.';

const coordinates = { lat: 0, lon: 0 };

describe('formatLocationName', () => {
  it('joins name, state and country', () => {
    expect(
      formatLocationName({
        name: 'Amsterdam',
        state: 'North Holland',
        country: 'NL',
        coordinates,
      }),
    ).toBe('Amsterdam, North Holland, NL');
  });

  it('skips a missing state or country', () => {
    expect(
      formatLocationName({ name: 'Zwolle', country: 'NL', coordinates }),
    ).toBe('Zwolle, NL');
    expect(
      formatLocationName({ name: 'Your location', country: '', coordinates }),
    ).toBe('Your location');
  });
});
