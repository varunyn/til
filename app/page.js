import { getAllPosts } from '../lib/mdx';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Today I Learned - Varun Yadav',
  description:
    'A collection of code snippets, solutions and things I learn day to day.',
  canonical: 'https://til.varunyadav.com'
};

export default async function Home() {
  const allPosts = await getAllPosts('blog');

  return <HomeClient allPosts={allPosts} />;
}
