import React from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'next-view-transitions';

const Blog = ({ slug, title, date, desc }) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block transition-all duration-300 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 dark:hover:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {date && (
            <time className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {format(parseISO(date), 'MMMM dd, yyyy')}
            </time>
          )}
        </div>
        <h2
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-smalt-600 dark:group-hover:text-smalt-400 transition-colors"
          data-blog-title
          style={{
            '--blog-title-name': `blog-title-${slug}`,
            viewTransitionName: `blog-title-${slug}`
          }}
        >
          {title}
        </h2>
        {desc && (
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
            {desc}
          </p>
        )}
        <div className="mt-4 flex items-center text-sm font-medium text-smalt-600 dark:text-smalt-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
          Read more
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
