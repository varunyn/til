'use client';

import Blog from '../components/Blog';
import { useState } from 'react';

export default function HomeClient({ allPosts }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = allPosts.filter((frontMatter) =>
    frontMatter.title?.toLowerCase().includes(searchValue.toLowerCase())
  );

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

      <div className="relative mt-4 mb-12 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-smalt-500 focus:border-smalt-500 sm:text-sm transition-all duration-200 shadow-sm"
        />
      </div>

      <section className="relative dark:text-whitedarktheme">
        {!filteredBlogPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center py-10">
            No posts found.
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-1">
          {filteredBlogPosts.map((frontMatter) => (
            <Blog key={frontMatter.title} {...frontMatter} />
          ))}
        </div>
      </section>
    </div>
  );
}
