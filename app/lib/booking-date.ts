/**
 * Booking dates, shared by the booking form and the booking route's action so
 * the browser and the server agree on which days can be booked.
 */

/** "Today" for bookings is Morocco's today, whatever the server or visitor clock says. */
export const BOOKING_TIME_ZONE = 'Africa/Casablanca';

/**
 * Tomorrow's calendar day in Morocco, as a local-midnight Date — the shape
 * buildMonthCells and toIsoDate work with. The Date constructor rolls the
 * day over month and year ends (31 Oct → 1 Nov, 31 Dec → 1 Jan).
 *
 * This is also the first bookable day: today and anything earlier are closed.
 */
export function moroccoTomorrow(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now);
  const part = (type: 'year' | 'month' | 'day') =>
    Number(parts.find((p) => p.type === type)?.value);
  return new Date(part('year'), part('month') - 1, part('day') + 1);
}

/**
 * `YYYY-MM-DD` from the date's own calendar day.
 *
 * Not `toISOString()`: that converts to UTC first, so a date picked in the
 * evening west of Greenwich — or any evening in a positive-offset zone — can
 * come out as the day before. The booking backend takes this literally.
 */
export function toIsoDate(d: Date): string {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

/**
 * Whether a `YYYY-MM-DD` departure can still be booked: a real calendar day,
 * tomorrow in Morocco or later. Same-format ISO dates compare correctly as
 * strings.
 */
export function isBookableIsoDate(iso: string, now = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  // Rejects 2026-02-31 and the like, which the Date constructor rolls over.
  if (toIsoDate(date) !== iso) return false;
  return iso >= toIsoDate(moroccoTomorrow(now));
}
