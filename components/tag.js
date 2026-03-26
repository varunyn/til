import { Link } from "next-view-transitions";

export default function Tag({ tag, count }) {
  return (
    <Link
      className="inline-flex min-h-11 touch-manipulation items-center gap-1 rounded-full bg-sorbus-50 px-3 py-2 font-medium text-sm text-sorbus-600 transition-colors duration-200 ease-out hover:bg-sorbus-100 hover:text-sorbus-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:bg-sorbus-900/20 dark:text-sorbus-400 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey dark:hover:bg-sorbus-900/30 dark:hover:text-sorbus-300"
      href={`/tags/${encodeURIComponent(tag)}`}
    >
      <span>{tag}</span>
      {count && (
        <span className="flip-number ml-1 rounded-full bg-sorbus-100 px-1.5 py-0.5 text-sorbus-800 text-xs dark:bg-sorbus-800 dark:text-sorbus-200">
          {count}
        </span>
      )}
    </Link>
  );
}
