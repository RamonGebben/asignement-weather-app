import { describe, expect, it } from 'vitest';
import { statusTone } from './statusTone';

describe('statusTone', () => {
  it('is positive once the position is found', () => {
    expect(statusTone('located')).toBe('positive');
  });

  it.each(['denied', 'unavailable', 'unsupported'] as const)(
    'is a problem for %s',
    status => {
      expect(statusTone(status)).toBe('problem');
    },
  );

  it.each(['idle', 'locating'] as const)('is neutral for %s', status => {
    expect(statusTone(status)).toBe('neutral');
  });
});
