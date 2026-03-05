'use client';

import Blog from '@/components/Blog';
import { Link } from 'next-view-transitions';

export default function TagPageClient({ posts, tag }) {
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

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((frontMatter) => (
            <Blog key={frontMatter.slug} {...frontMatter} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No posts in this tag.
          </p>
        </div>
      )}
    </div>
  );
}
