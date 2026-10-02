import { describe, expect, it } from 'vitest';
import { toPositionStatus } from '.';

describe('toPositionStatus', () => {
  it('reports a refused permission as denied', () => {
    expect(toPositionStatus({ code: 1 })).toBe('denied');
  });

  it.each([2, 3])(
    'reports error code %s (position unavailable, timeout) as unavailable',
    code => {
      expect(toPositionStatus({ code })).toBe('unavailable');
    },
  );
});
