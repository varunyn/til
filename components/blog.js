import { format, parseISO } from "date-fns";
import { Link } from "next-view-transitions";

const Blog = ({ slug, title, date, desc }) => {
  return (
    <Link
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700"
      href={`/blog/${slug}`}
    >
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          {date && (
            <time className="font-medium text-gray-500 text-sm dark:text-gray-400">
              {format(parseISO(date), "MMMM dd, yyyy")}
            </time>
          )}
        </div>
        <h2
          className="mb-3 font-bold text-gray-900 text-xl transition-colors group-hover:text-sorbus-600 sm:text-2xl dark:text-gray-100 dark:group-hover:text-sorbus-400"
          data-blog-title
          style={{
            "--blog-title-name": `blog-title-${slug}`,
            viewTransitionName: `blog-title-${slug}`,
          }}
        >
          {title}
        </h2>
        {desc && (
          <p className="line-clamp-2 text-base text-gray-600 leading-relaxed dark:text-gray-400">
            {desc}
          </p>
        )}
        <div className="mt-4 flex translate-x-2 transform items-center font-medium text-sm text-sorbus-600 opacity-0 transition-opacity group-hover:translate-x-0 group-hover:opacity-100 dark:text-sorbus-400">
          Read more
          <svg
            aria-hidden
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Read more arrow</title>
            <path
              d="M17 8l4 4m0 0l-4 4m4-4H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
