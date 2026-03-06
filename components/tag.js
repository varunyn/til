import { Link } from "next-view-transitions";

export default function Tag({ tag, count }) {
  return (
    <Link
      className="inline-flex items-center gap-1 rounded-full bg-smalt-50 px-3 py-1 font-medium text-sm text-smalt-600 transition-colors hover:bg-smalt-100 hover:text-smalt-800 dark:bg-smalt-900/20 dark:text-smalt-400 dark:hover:bg-smalt-900/30 dark:hover:text-smalt-300"
      href={`/tags/${tag}`}
    >
      <span>{tag}</span>
      {count && (
        <span className="flip-number ml-1 rounded-full bg-smalt-100 px-1.5 py-0.5 text-smalt-800 text-xs dark:bg-smalt-800 dark:text-smalt-200">
          {count}
        </span>
      )}
    </Link>
  );
}
