"use client";

import { Link } from "next-view-transitions";

import NotesEntry from "../components/notes-entry";

const LINK_ROW =
  "inline-flex min-h-11 items-center rounded-md px-1 font-medium text-sorbus-600 underline decoration-gray-300 underline-offset-4 transition-colors duration-200 ease-out [-webkit-tap-highlight-color:transparent] touch-manipulation hover:text-sorbus-700 hover:decoration-sorbus-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:text-sorbus-400 dark:decoration-gray-600 dark:hover:text-sorbus-300 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey";

const PILL_LINK =
  "inline-flex min-h-11 items-center rounded-md border border-gray-200 bg-white/70 px-3.5 py-2 font-medium text-gray-700 text-sm transition-[background-color,border-color,color] duration-200 ease-out [-webkit-tap-highlight-color:transparent] touch-manipulation hover:border-sorbus-200 hover:bg-sorbus-50 hover:text-sorbus-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 dark:hover:border-sorbus-800 dark:hover:bg-sorbus-950/35 dark:hover:text-sorbus-200 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey";

export default function HomeClient({ allPosts }) {
  const topicCount = new Set(allPosts.flatMap(({ tags }) => tags ?? [])).size;
  const noteLabel = allPosts.length === 1 ? "note" : "notes";
  const topicLabel = topicCount === 1 ? "topic" : "topics";

  return (
    <div className="mx-auto max-w-3xl pt-10 pr-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] sm:pt-14 sm:pr-6 sm:pl-6">
      <header className="border-gray-200 border-b pb-8 dark:border-gray-700">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-sorbus-50 px-3 py-1.5 font-semibold text-sm text-sorbus-800 dark:bg-sorbus-950/40 dark:text-sorbus-200">
            Working notes
          </span>
          <span className="rounded-md bg-white/70 px-3 py-1.5 font-medium text-gray-600 text-sm ring-1 ring-gray-200 dark:bg-gray-800/70 dark:text-gray-300 dark:ring-gray-700">
            {allPosts.length} {noteLabel}
          </span>
          <Link className={PILL_LINK} href="/tags">
            {topicCount} {topicLabel}
          </Link>
        </div>

        <h1 className="font-bold text-4xl text-gray-950 tracking-normal sm:text-5xl dark:text-gray-50">
          Today I Learned
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] text-gray-700 leading-relaxed dark:text-gray-300">
          A running journal of practical code notes, fixes, and small lessons
          from cloud work, web development, automation, and tools I use day to
          day. Rough edges included.
        </p>

        <div className="mt-6 flex flex-col gap-3 text-gray-600 text-sm sm:flex-row sm:flex-wrap sm:items-center dark:text-gray-400">
          <p>
            Follow new posts with{" "}
            <Link className={LINK_ROW} href="/feed.xml">
              RSS
            </Link>
            .
          </p>
          <p>
            Reach me on{" "}
            <a
              className={LINK_ROW}
              href="https://twitter.com/varun1_yadav"
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>{" "}
            or at{" "}
            <a className={LINK_ROW} href="mailto:hi@varunyadav.com">
              hi@varunyadav.com
            </a>
            .
          </p>
        </div>
      </header>

      <section aria-label="Latest notes" className="mt-8 sm:mt-10">
        {allPosts.length ? null : (
          <p className="rounded-lg border border-gray-200 border-dashed px-4 py-8 text-center text-gray-600 dark:border-gray-700 dark:text-gray-400">
            No posts found.
          </p>
        )}
        <div className="divide-y divide-gray-200 [contain-intrinsic-size:auto_900px] [content-visibility:auto] dark:divide-gray-700/80">
          {allPosts.map((post) => (
            <NotesEntry
              key={post.slug}
              slug={post.slug}
              tags={post.tags}
              title={post.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
