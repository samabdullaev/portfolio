// Display-layer formatters for ISO date strings (YYYY-MM-DD) coming from
// Sanity's `date` type. Source data with month-only precision (e.g.
// certificates) stores day=01 — formatMonthYear drops the day. Sources
// with day precision (e.g. blog articles) use formatLongDate.
//
// Implementations parse manually rather than via `new Date()` to avoid
// timezone-shift surprises.

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** "2022-08-01" → "Aug 2022" — for month-precision sources (certificates). */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2025-08-11" → "Aug 11, 2025" — for day-precision sources (blog, mentorship, applications). */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
