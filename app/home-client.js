"use client";

import { Link } from "next-view-transitions";

import NotesEntry from "../components/notes-entry";

const LINK_ROW =
  "inline-flex min-h-11 items-center rounded-md px-1 font-medium text-sorbus-600 underline decoration-gray-300 underline-offset-4 transition-colors duration-200 ease-out [-webkit-tap-highlight-color:transparent] touch-manipulation hover:text-sorbus-700 hover:decoration-sorbus-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:text-sorbus-400 dark:decoration-gray-600 dark:hover:text-sorbus-300 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey";

export default function HomeClient({ allPosts }) {
  return (
    <div className="mx-auto max-w-2xl pt-8 pr-[max(1rem,env(safe-area-inset-right))] pb-[max(4rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] sm:pt-10 sm:pr-6 sm:pl-6">
      <header className="space-y-5">
        <h1 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl dark:text-gray-50">
          Today I Learned
        </h1>
        <p className="max-w-prose text-[1.0625rem] text-gray-600 leading-relaxed dark:text-gray-400">
          A collection of code snippets, solutions, and things I learn day to
          day — a running journal of practical notes. Bias and rough edges
          included; I hope something here saves you a search.
        </p>
        <p className="text-gray-700 text-sm dark:text-gray-300">
          Follow new posts:{" "}
          <Link className={LINK_ROW} href="/feed.xml">
            RSS
          </Link>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
          Questions or a different take? I&apos;m on{" "}
          <a
            className={LINK_ROW}
            href="https://twitter.com/varun1_yadav"
            rel="noopener noreferrer"
            target="_blank"
          >
            X
          </a>{" "}
          and reachable at{" "}
          <a className={LINK_ROW} href="mailto:hi@varunyadav.com">
            hi@varunyadav.com
          </a>
          .
        </p>
      </header>

      <hr className="my-8 border-gray-200 sm:my-10 dark:border-gray-700" />

      <section aria-labelledby="start-reading">
        <h2
          className="mb-5 font-semibold text-gray-900 text-xl tracking-tight sm:mb-6 dark:text-gray-100"
          id="start-reading"
        >
          Start reading here
        </h2>
        {!allPosts.length && (
          <p className="py-6 text-center text-gray-600 dark:text-gray-400">
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
