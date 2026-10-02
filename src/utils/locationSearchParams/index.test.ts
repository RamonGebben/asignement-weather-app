import { describe, expect, it } from 'vitest';
import { defaultLocation } from '~/weather/defaultLocation';
import type { Location } from '~/weather/model';
import { parseLocationSearchParams, toLocationSearchParams } from '.';

const amsterdam: Location = {
  name: 'Amsterdam',
  country: 'NL',
  state: 'North Holland',
  coordinates: { lat: 52.3727598, lon: 4.8936041 },
};

const fromQuery = (query: string) =>
  parseLocationSearchParams(
    Object.fromEntries(new URLSearchParams(query).entries()),
  );

describe('parseLocationSearchParams', () => {
  it('reads a location from the URL', () => {
    expect(
      fromQuery(
        'lat=52.37&lon=4.89&name=Amsterdam&country=NL&state=North+Holland',
      ),
    ).toEqual({
      name: 'Amsterdam',
      country: 'NL',
      state: 'North Holland',
      coordinates: { lat: 52.37, lon: 4.89 },
    });
  });

  it('leaves out a missing state', () => {
    expect(fromQuery('lat=1&lon=2&name=Somewhere&country=FR')).toEqual({
      name: 'Somewhere',
      country: 'FR',
      coordinates: { lat: 1, lon: 2 },
    });
  });

  it('accepts a place without a country', () => {
    expect(fromQuery('lat=0&lon=-140&name=Your+location&country=')).toEqual({
      name: 'Your location',
      country: '',
      coordinates: { lat: 0, lon: -140 },
    });
  });

  it('uses the first value of a repeated parameter', () => {
    expect(
      parseLocationSearchParams({
        lat: ['52.37', '1'],
        lon: '4.89',
        name: 'Amsterdam',
        country: 'NL',
      }).coordinates,
    ).toEqual({ lat: 52.37, lon: 4.89 });
  });

  it('opens on the default location without parameters', () => {
    expect(parseLocationSearchParams({})).toBe(defaultLocation);
  });

  it.each([
    ['a missing name', 'lat=1&lon=2&country=NL'],
    ['an empty latitude', 'lat=&lon=2&name=X&country=NL'],
    ['a non-numeric longitude', 'lat=1&lon=east&name=X&country=NL'],
    ['an out-of-range latitude', 'lat=91&lon=2&name=X&country=NL'],
    ['an out-of-range longitude', 'lat=1&lon=181&name=X&country=NL'],
  ])('falls back to the default for %s', (_, query) => {
    expect(fromQuery(query)).toBe(defaultLocation);
  });
});

describe('toLocationSearchParams', () => {
  it('writes every field', () => {
    expect(toLocationSearchParams(amsterdam)).toBe(
      'lat=52.3727598&lon=4.8936041&name=Amsterdam&country=NL&state=North+Holland',
    );
  });

  it.each([
    ['with a state', amsterdam],
    ['without a state', { ...defaultLocation, state: undefined }],
    [
      'with special characters',
      { ...amsterdam, name: "'s-Hertogenbosch & Co" },
    ],
  ])('round-trips a location %s', (_, location) => {
    const { state, ...rest } = location;
    const expected = state === undefined ? rest : location;

    expect(fromQuery(toLocationSearchParams(location))).toEqual(expected);
  });
});
