import React from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'next-view-transitions';

const Blog = ({ slug, title, date, desc }) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block transition-all duration-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
      data-blog-card
      style={{
        '--blog-card-name': `blog-card-${slug}`,
        viewTransitionName: `blog-card-${slug}`
      }}
    >
      <div className="p-4 sm:p-5">
        <h2
          className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-1"
          data-blog-title
          style={{
            '--blog-title-name': `blog-title-${slug}`,
            viewTransitionName: `blog-title-${slug}`
          }}
        >
          {title}
        </h2>
        {date && (
          <p
            className="text-sm text-gray-600 dark:text-gray-400"
            data-blog-date
            style={{ '--blog-date-name': `blog-date-${slug}` }}
          >
            {format(parseISO(date), 'MMMM dd, yyyy')}
          </p>
        )}
        {desc && (
          <p
            className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-2"
            data-blog-description
            style={{ '--blog-description-name': `blog-description-${slug}` }}
          >
            {desc}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Blog;
