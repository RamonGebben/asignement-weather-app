/*
 * The provider gives a UTC offset, not a timezone name, so local times are
 * made by shifting the instant by the offset and formatting it as UTC.
 * The locale is fixed so output is the same on server and client.
 */

const locale = 'en-GB';

const timeFormat = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'UTC',
});

const dateFormat = new Intl.DateTimeFormat(locale, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

const weekdayFormat = new Intl.DateTimeFormat(locale, {
  weekday: 'long',
  timeZone: 'UTC',
});

const shift = (iso: string, offset: number) =>
  new Date(Date.parse(iso) + offset * 1000);

/** The wall-clock time at the location, e.g. "07:42". */
export const formatLocalTime = (iso: string, offset: number) =>
  timeFormat.format(shift(iso, offset));

/** The date at the location, e.g. "Fri 2 Oct". */
export const formatLocalDate = (iso: string, offset: number) =>
  dateFormat.format(shift(iso, offset));

/** A `YYYY-MM-DD` local date as its weekday, e.g. "Saturday". */
export const formatWeekday = (date: string) =>
  weekdayFormat.format(new Date(`${date}T00:00:00Z`));
