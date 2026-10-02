import { describe, expect, it } from 'vitest';
import { toIsoString, toLocalDate } from '.';

// 2 October 2026, 23:30 UTC
const lateUtc = Date.UTC(2026, 9, 2, 23, 30) / 1000;

describe('toIsoString', () => {
  it('converts epoch seconds to UTC ISO-8601', () => {
    expect(toIsoString(lateUtc)).toBe('2026-10-02T23:30:00.000Z');
  });
});

describe('toLocalDate', () => {
  it('is already the next day east of UTC', () => {
    expect(toLocalDate(lateUtc, 9 * 3600)).toBe('2026-10-03');
  });

  it('is still the same day west of UTC', () => {
    expect(toLocalDate(lateUtc, -4 * 3600)).toBe('2026-10-02');
  });

  it('matches UTC at offset zero', () => {
    expect(toLocalDate(lateUtc, 0)).toBe('2026-10-02');
  });
});
