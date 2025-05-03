import Link from 'next/link';

const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${text}`}
      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
    >
      {text}
    </Link>
  );
};

export default Tag;
