import { getAllPosts } from '../lib/mdx';
import Blog from '../components/Blog';
import { useState } from 'react';
import Head from 'next/head';

export default function Home({ allPosts }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = allPosts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center max-w-2xl mx-auto h-full">
      <Head>
        <meta name="description" content="Today I learned" />
        <meta property="og:title" content="TIL-Varun Yadav" />
        <meta property="og:description" content="Today I learned" />
        <meta property="og:url" content={`https://til.varunyadav.com`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@varun1_yadav" />
        <meta name="twitter:title" content="TIL-Varun Yadav" />
        <meta name="twitter:description" ccontent="Today I learned" />
      </Head>
      <div className="relative mt-5">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <section className="relative mt-5  dark:bg-darkgrey dark:text-whitedarktheme">
        {!filteredBlogPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No posts found.
          </p>
        )}
        <div className="space-y-4 mobile:p-5">
          {filteredBlogPosts.map((frontMatter) => (
            <Blog key={frontMatter.title} {...frontMatter} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts('blog'); // or whatever folder you're using

  return {
    props: {
      allPosts,
    },
  };
}
