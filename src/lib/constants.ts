// App-wide constants. Domain-specific magic numbers go here so any module
// that needs them shares a single source of truth.

// Sam's monthly journey began Oct 2023 — that's Month 1. Used to derive
// the "Month N" labels in the About bento and the Journey hub timeline.
export const JOURNEY_START_YEAR = 2023;
export const JOURNEY_START_MONTH = 10;

/**
 * Given a journeyUpdate's `date` (publish date, 1st of the month AFTER
 * the recap month), returns the 1-based month number since Oct 2023.
 *
 * Example: publish 2024-01-01 → recap Dec 2023 → Month 3.
 */
export function monthNumber(publishIso: string): number {
  const { year, month } = recapMonth(publishIso);
  return (year - JOURNEY_START_YEAR) * 12 + (month - JOURNEY_START_MONTH) + 1;
}

/**
 * Returns the recap year for a journeyUpdate publish date — used for
 * grouping cards on the Journey hub. publish 2024-01-01 → recap year 2023.
 */
export function recapYear(publishIso: string): number {
  return recapMonth(publishIso).year;
}

function recapMonth(publishIso: string): { year: number; month: number } {
  const [y, m] = publishIso.split("-").map(Number);
  return m === 1 ? { year: y - 1, month: 12 } : { year: y, month: m - 1 };
}
