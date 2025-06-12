import Link from 'next/link';

const Tag = ({ text, count }) => {
  return (
    <Link
      href={`/tags/${encodeURIComponent(text)}`}
      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors"
    >
      {text}
      {count && (
        <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

export default Tag;
