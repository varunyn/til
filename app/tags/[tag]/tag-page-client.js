"use client";

import { Link } from "next-view-transitions";
import Blog from "@/components/blog";

export default function TagPageClient({ posts, tag }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Link
          className="mb-4 inline-block text-sorbus-600 hover:underline dark:text-sorbus-400"
          href="/tags"
        >
          &larr; All Tags
        </Link>
        <h1 className="mt-2 font-bold text-3xl text-gray-900 sm:text-4xl dark:text-gray-100">
          #{tag}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((frontMatter) => (
            <Blog key={frontMatter.slug} {...frontMatter} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No posts in this tag.
          </p>
        </div>
      )}
    </div>
  );
}
