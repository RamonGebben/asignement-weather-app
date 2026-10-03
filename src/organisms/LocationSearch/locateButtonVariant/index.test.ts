import { describe, expect, it } from 'vitest';
import { locateButtonVariant } from '.';

describe('locateButtonVariant', () => {
  it('is quaternary once the position is found', () => {
    expect(locateButtonVariant('located')).toBe('quaternary');
  });

  it.each(['denied', 'unavailable', 'unsupported'] as const)(
    'is error for %s',
    status => {
      expect(locateButtonVariant(status)).toBe('error');
    },
  );

  it.each(['idle', 'locating'] as const)('is secondary for %s', status => {
    expect(locateButtonVariant(status)).toBe('secondary');
  });
});
