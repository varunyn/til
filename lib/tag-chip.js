/** Shared focus ring + tap behavior for tag chips (WCAG 2.4.7, 44px touch targets). */
const TAG_CHIP_CHROME =
  "min-h-11 touch-manipulation items-center justify-center rounded-md px-3.5 py-2 font-medium text-sm tracking-wide motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:focus-visible:ring-sorbus-400/45 dark:focus-visible:ring-offset-darkgrey";

/** Sorbus-only tints so homepage chips match the accent palette. */
const SORBUS_PALETTES = [
  "bg-sorbus-50 text-sorbus-900 hover:bg-sorbus-100 dark:bg-sorbus-950/45 dark:text-sorbus-100 dark:hover:bg-sorbus-900/55",
  "bg-sorbus-100 text-sorbus-900 hover:bg-sorbus-200/90 dark:bg-sorbus-950/40 dark:text-sorbus-100 dark:hover:bg-sorbus-900/50",
  "bg-sorbus-50 text-sorbus-800 hover:bg-sorbus-100 dark:bg-sorbus-900/35 dark:text-sorbus-200 dark:hover:bg-sorbus-900/45",
  "bg-sorbus-200/90 text-sorbus-950 hover:bg-sorbus-200 dark:bg-sorbus-900/40 dark:text-sorbus-100 dark:hover:bg-sorbus-800/55",
  "bg-sorbus-100 text-sorbus-800 hover:bg-sorbus-200/90 dark:bg-sorbus-950/45 dark:text-sorbus-200 dark:hover:bg-sorbus-900/50",
  "bg-sorbus-50 text-sorbus-950 hover:bg-sorbus-100 dark:bg-sorbus-950/50 dark:text-sorbus-50 dark:hover:bg-sorbus-900/55",
  "bg-sorbus-200/70 text-sorbus-900 hover:bg-sorbus-200 dark:bg-sorbus-900/38 dark:text-sorbus-100 dark:hover:bg-sorbus-800/50",
  "bg-sorbus-100 text-sorbus-950 hover:bg-sorbus-200 dark:bg-sorbus-900/42 dark:text-sorbus-100 dark:hover:bg-sorbus-900/52",
];

/**
 * Deterministic pastel “lozenge” styles per tag (Sorbus palette only).
 * @param {string} key - Raw tag string or "notes" for untagged
 * @returns {string} Tailwind classes
 */
export function tagChipClassName(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 1_000_000_007;
  }
  return `${SORBUS_PALETTES[hash % SORBUS_PALETTES.length]} ${TAG_CHIP_CHROME}`;
}
