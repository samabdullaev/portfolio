import type { CSSProperties } from "react";

// The status accent hex as a solid fill — used for the status dot on board
// column headers, dropdown options, and the table badge. (Dynamic hex can't be
// a Tailwind class, hence inline style.)
export function accentStyle(accent: string): CSSProperties {
  return { backgroundColor: accent };
}

// Light- and dark-safe badge surface from one accent hex (translucent wash +
// theme-tracking text), for the Status column badge.
export function statusBadgeStyle(accent: string): CSSProperties {
  return {
    backgroundColor: `color-mix(in oklab, ${accent} 16%, transparent)`,
    color: `color-mix(in oklab, ${accent} 70%, var(--color-text))`,
  };
}
