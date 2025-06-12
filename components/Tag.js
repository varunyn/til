import { Link } from 'next-view-transitions';

export default function Tag({ tag, count }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-smalt-600 dark:text-smalt-400 hover:text-smalt-800 dark:hover:text-smalt-300 bg-smalt-50 dark:bg-smalt-900/20 hover:bg-smalt-100 dark:hover:bg-smalt-900/30 rounded-full transition-colors"
    >
      <span>{tag}</span>
      {count && (
        <span className="ml-1 px-1.5 py-0.5 text-xs bg-smalt-100 dark:bg-smalt-800 text-smalt-800 dark:text-smalt-200 rounded-full flip-number">
          {count}
        </span>
      )}
    </Link>
  );
}
