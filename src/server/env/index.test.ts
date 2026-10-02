import { describe, expect, it } from 'vitest';
import { getServerEnv } from '.';

describe('getServerEnv', () => {
  it('returns the validated environment', () => {
    expect(getServerEnv({ OPENWEATHERMAP_API_KEY: ' abc123 ' })).toEqual({
      OPENWEATHERMAP_API_KEY: 'abc123',
    });
  });

  it('explains a missing key', () => {
    expect(() => getServerEnv({})).toThrow(
      'OPENWEATHERMAP_API_KEY is not set - see .env.example',
    );
  });

  it('explains an empty key', () => {
    expect(() => getServerEnv({ OPENWEATHERMAP_API_KEY: '  ' })).toThrow(
      'OPENWEATHERMAP_API_KEY is empty - see .env.example',
    );
  });
});
