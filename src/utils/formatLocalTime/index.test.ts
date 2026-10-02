import { describe, expect, it } from 'vitest';
import { formatLocalDate, formatLocalTime, formatWeekday } from '.';

const sunrise = '2026-10-02T05:42:41.000Z';

describe('formatLocalTime', () => {
  it('shows the time at the location', () => {
    expect(formatLocalTime(sunrise, 7200)).toBe('07:42');
  });

  it('works west of UTC and across midnight', () => {
    expect(formatLocalTime(sunrise, -4 * 3600)).toBe('01:42');
    expect(formatLocalTime('2026-10-02T23:30:00.000Z', 3600)).toBe('00:30');
  });
});

describe('formatLocalDate', () => {
  it('shows the date at the location', () => {
    expect(formatLocalDate(sunrise, 7200)).toBe('Fri 2 Oct');
  });

  it('rolls over to the next day east of UTC', () => {
    expect(formatLocalDate('2026-10-02T23:30:00.000Z', 9 * 3600)).toBe(
      'Sat 3 Oct',
    );
  });
});

describe('formatWeekday', () => {
  it.each([
    ['2026-10-02', 'Friday'],
    ['2026-10-03', 'Saturday'],
    ['2026-10-04', 'Sunday'],
  ])('names %s as %s', (date, weekday) => {
    expect(formatWeekday(date)).toBe(weekday);
  });
});
