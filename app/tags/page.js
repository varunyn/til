import Link from "next/link";
import PageTransition from "@/components/page-transition";
import { getAllTags } from "@/lib/tags";

export const metadata = {
  alternates: { canonical: "https://til.varunyadav.com/tags" },
  description: "Browse Varun Yadav's TIL notes by topic and technology tag.",
  title: "Tags - TIL",
};

export default function TagsPage() {
  const tags = Object.entries(getAllTags("blog")).sort((a, b) => b[1] - a[1]);
  return (
    <PageTransition>
      <div className="topics-browser">
        <h1>Topics</h1>
        <p>Browse notes across {tags.length} topics.</p>
        <nav aria-label="Topics" className="topics-grid">
          {tags.map(([tag, count]) => (
            <Link
              className="topic-index-link"
              href={`/tags/${encodeURIComponent(tag)}`}
              key={tag}
              transitionTypes={["nav-forward"]}
            >
              <span>{tag}</span>
              <span>
                {count} {count === 1 ? "note" : "notes"}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </PageTransition>
  );
}
