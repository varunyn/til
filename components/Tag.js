import Link from 'next/link';

const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${text}`}
      className="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
