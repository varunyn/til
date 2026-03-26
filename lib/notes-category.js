const TAG_WORD_SPLIT = /[-_\s]+/;
const EMOJI_RANGE =
  /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;

/**
 * Picks a short category label for the notes-style index, from post tags.
 * @param {string[] | undefined} tags
 * @returns {string}
 */
export function categoryFromTags(tags) {
  if (!tags?.length) {
    return "Notes";
  }
  const raw = tags[0];
  const withoutEmoji = raw.replace(EMOJI_RANGE, "");
  const trimmed = withoutEmoji.trim();
  if (!trimmed) {
    return raw.trim() || "Notes";
  }
  return trimmed
    .split(TAG_WORD_SPLIT)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * First tag as stored in frontmatter, for linking to `/tags/[tag]`.
 * @param {string[] | undefined} tags
 * @returns {string | null}
 */
export function primaryTagSlug(tags) {
  if (!tags?.length) {
    return null;
  }
  return tags[0];
}
