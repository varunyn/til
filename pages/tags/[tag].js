import { getAllPosts } from '@/lib/mdx';
import { getAllTags } from '@/lib/tags';
import { useState } from 'react';

import Blog from '@/components/Blog';

export async function getStaticPaths() {
  const tags = await getAllTags('blog');
  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllPosts('blog');
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags.map((t) => t).includes(params.tag)
  );

  return { props: { posts: filteredPosts, tag: params.tag } };
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex mt-5 flex-col justify-center max-w-2xl mx-auto h-full">
      <h2 className="text-center m-5 text-5xl"> #{tag} </h2>
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
      <section className="relative  mt-5  dark:bg-darkgrey dark:text-whitedarktheme">
        <div className="space-y-4 mobile:p-5">
          {filteredBlogPosts.map((frontMatter) => (
            <Blog key={title} {...frontMatter} />
          ))}
        </div>
      </section>
    </div>
  );
}
