import { Link } from "next-view-transitions";

import { categoryFromTags, primaryTagSlug } from "../lib/notes-category";
import { tagChipClassName } from "../lib/tag-chip";

const TITLE_LINK =
  "block rounded-md py-2.5 text-left transition-colors duration-200 ease-out [-webkit-tap-highlight-color:transparent] touch-manipulation hover:text-sorbus-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:hover:text-sorbus-400 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey sm:py-0";

/**
 * @param {object} props
 * @param {string} props.slug
 * @param {string} props.title
 * @param {string[] | undefined} props.tags
 */
export default function NotesEntry({ slug, title, tags }) {
  const label = categoryFromTags(tags);
  const primary = primaryTagSlug(tags);
  const tagHref = primary ? `/tags/${encodeURIComponent(primary)}` : "/tags";
  const chipKey = primary ?? "notes";
  const chipClass = tagChipClassName(chipKey);

  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <h3 className="m-0 min-w-0 font-semibold text-[1.05rem] text-gray-900 leading-snug tracking-tight dark:text-gray-100">
        <Link
          className={`${TITLE_LINK} break-words`}
          href={`/blog/${slug}`}
          style={{
            viewTransitionName: `blog-title-${slug}`,
          }}
        >
          {title}
        </Link>
      </h3>
      <Link
        aria-label={
          primary ? `View posts tagged ${primary}` : "Browse all tags"
        }
        className={`inline-flex w-fit shrink-0 ${chipClass}`}
        href={tagHref}
      >
        {label}
      </Link>
    </div>
  );
}
