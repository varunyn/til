"use client";

import Blog from "../components/blog";

export default function HomeClient({ allPosts }) {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-4 sm:px-6">
      <div className="space-y-4 pt-16 pb-8 text-center sm:text-left">
        <h1 className="font-extrabold text-4xl text-gray-900 tracking-tight sm:text-5xl md:text-6xl dark:text-gray-100">
          <span className="block xl:inline">Today I Learned</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:mx-0 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-400">
          A collection of code snippets, solutions, and things I learn day to
          day.
        </p>
      </div>

      <section className="relative mt-4 mb-12 dark:text-whitedarktheme">
        {!allPosts.length && (
          <p className="mb-4 py-10 text-center text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-1">
          {allPosts.map((frontMatter) => (
            <Blog key={frontMatter.title} {...frontMatter} />
          ))}
        </div>
      </section>
    </div>
  );
}
