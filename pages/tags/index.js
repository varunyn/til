import Link from 'next/link';
import Tag from '@/components/Tag';
import { getAllTags } from '@/lib/tags';
import Head from 'next/head';

export async function getStaticProps() {
  const tags = await getAllTags('blog');

  return { props: { tags } };
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      <Head>
        <title>Tags - TIL</title>
        <meta name="description" content="Browse posts by tag" />
      </Head>

      <div className="py-8 sm:py-16">
        <h1 className="text-3xl font-bold leading-tight text-center text-gray-900 dark:text-gray-100 sm:text-4xl mb-8 sm:mb-12">
          Tags
        </h1>

        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(tags).length === 0 && (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No tags found.
            </p>
          )}

          {sortedTags.map((tag) => {
            return (
              <div
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 flex items-center transition-transform hover:scale-105"
              >
                <Tag text={tag} />
                <Link
                  href={`/tags/${tag}`}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[tag]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
