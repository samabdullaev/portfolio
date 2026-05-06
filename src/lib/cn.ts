import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine Tailwind class names. clsx handles conditional/nested values;
 * twMerge resolves later utilities winning over earlier conflicting ones
 * (e.g. consumer `p-8` overrides component default `p-4` reliably).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
