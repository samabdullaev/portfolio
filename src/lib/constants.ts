// App-wide constants. Domain-specific magic numbers go here so any module
// that needs them shares a single source of truth.

// Sam's monthly journey began Oct 2023 — that's Month 1. Used to derive
// the "Month N" labels in the About bento and the Journey hub timeline.
export const JOURNEY_START_YEAR = 2023;
export const JOURNEY_START_MONTH = 10;

export function monthNumber(year: number, month: number) {
  return (year - JOURNEY_START_YEAR) * 12 + (month - JOURNEY_START_MONTH) + 1;
}
