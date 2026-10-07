"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { FiArrowUpRight, FiRss } from "react-icons/fi";
import NotesEntry from "../components/notes-entry";

const NAMED_TOPIC = /[a-zA-Z]/;

export default function HomeClient({ allPosts }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const selectTopic = useCallback(
    (event) => setSelectedTag(event.currentTarget.dataset.topic || null),
    []
  );
  const counts = new Map();
  for (const post of allPosts) {
    for (const tag of new Set(post.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  const quickTopics = [...counts]
    .filter(([tag]) => NAMED_TOPIC.test(tag))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const posts = selectedTag
    ? allPosts.filter(({ tags }) => tags?.includes(selectedTag))
    : allPosts;

  return (
    <div className="notes-home font-sans">
      <header className="notes-intro">
        <h1>Today I Learned</h1>
        <p className="notes-description">
          I’m <Link href="/about">Varun</Link>. I keep code snippets, fixes, and
          things I learn here — mostly about the web, cloud, and tools I use.
        </p>
      </header>

      <section aria-labelledby="notes-heading" className="notes-index">
        <div className="notes-index-heading">
          <h2 id="notes-heading">
            Latest notes <span>{allPosts.length}</span>
          </h2>
          <Link className="browse-topics" href="/tags">
            All topics <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <fieldset className="topic-filter">
          <legend className="sr-only">Filter notes by topic</legend>
          <button
            aria-pressed={selectedTag === null}
            onClick={selectTopic}
            type="button"
          >
            All notes
          </button>
          {quickTopics.map(([tag]) => (
            <button
              aria-pressed={selectedTag === tag}
              data-topic={tag}
              key={tag}
              onClick={selectTopic}
              type="button"
            >
              {tag}
            </button>
          ))}
        </fieldset>
        <p aria-live="polite" className="sr-only">
          Showing {posts.length} {posts.length === 1 ? "note" : "notes"}
          {selectedTag ? ` tagged ${selectedTag}` : ""}.
        </p>
        <div className="notes-list">
          {posts.map((post) => (
            <NotesEntry
              date={post.date}
              dateLabel={post.dateLabel}
              key={post.slug}
              slug={post.slug}
              tags={post.tags}
              title={post.title}
            />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="py-8 text-gray-600 dark:text-gray-400">
            No notes yet. Try another topic.
          </p>
        )}
        <div className="notes-signoff">
          <a className="follow-feed" href="/feed.xml">
            <FiRss aria-hidden="true" /> Follow via RSS
          </a>
          <a className="contact-link" href="mailto:hi@varunyadav.com">
            hi@varunyadav.com
          </a>
        </div>
      </section>
    </div>
  );
}
