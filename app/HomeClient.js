'use client';

import Blog from '../components/Blog';

export default function HomeClient({ allPosts }) {
  return (
    <div className="flex flex-col justify-center max-w-3xl mx-auto h-full px-4 sm:px-6">
      <div className="pt-16 pb-8 space-y-4 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Today I Learned</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto sm:mx-0 text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A collection of code snippets, solutions, and things I learn day to
          day.
        </p>
      </div>

      <section className="relative mt-4 mb-12 dark:text-whitedarktheme">
        {!allPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center py-10">
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
