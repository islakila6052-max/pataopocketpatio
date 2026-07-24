import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely, resolving conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with locale string and optional suffix.
 */
export function formatNumber(num, suffix = '+') {
  return num.toLocaleString() + suffix;
}
