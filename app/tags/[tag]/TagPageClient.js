'use client';

import { useState } from 'react';
import Blog from '@/components/Blog';
import { Link } from 'next-view-transitions';

export default function TagPageClient({ posts, tag }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-smalt-600 dark:text-smalt-400 hover:underline mb-4 inline-block"
        >
          &larr; All Tags
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-gray-100">
          #{tag}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="relative mb-6">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 focus:ring-smalt-500 focus:border-smalt-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
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

      {filteredBlogPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredBlogPosts.map((frontMatter) => (
            <Blog key={frontMatter.slug} {...frontMatter} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found matching &quot;{searchValue}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
