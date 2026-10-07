import Link from "next/link";
import { ViewTransition } from "react";
import { primaryTagSlug } from "../lib/notes-category";

export default function NotesEntry({ slug, title, tags, date, dateLabel }) {
  const primary = primaryTagSlug(tags);
  const tagHref = primary ? `/tags/${encodeURIComponent(primary)}` : "/tags";

  return (
    <div className="note-row">
      <h3 className="note-title">
        <Link
          className="note-title-link"
          href={`/blog/${slug}`}
          transitionTypes={["nav-forward"]}
        >
          <ViewTransition
            default="none"
            name={`blog-title-${slug}`}
            share="text-morph"
          >
            <span>{title}</span>
          </ViewTransition>
        </Link>
      </h3>
      <div className="note-meta">
        <Link
          aria-label={
            primary ? `View posts tagged ${primary}` : "Browse all tags"
          }
          className="note-topic"
          href={tagHref}
          transitionTypes={["nav-forward"]}
        >
          {primary || "Notes"}
        </Link>
        {date && dateLabel && (
          <>
            <span aria-hidden="true" className="note-meta-separator">
              ·
            </span>
            <time dateTime={date}>{dateLabel}</time>
          </>
        )}
      </div>
    </div>
  );
}
