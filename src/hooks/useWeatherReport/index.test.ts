import { describe, expect, it } from 'vitest';
import { weatherRefetchInterval } from '.';

describe('weatherRefetchInterval', () => {
  it('refreshes every ten minutes, as often as the provider updates', () => {
    expect(weatherRefetchInterval).toBe(600_000);
  });
});
