import { getAllPosts } from '@/lib/mdx';
import { getAllTags } from '@/lib/tags';
import { notFound } from 'next/navigation';
import TagPageClient from './TagPageClient';

// Disable dynamic params to only allow pre-generated routes
export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags('blog');
  return Object.keys(tags).map((tag) => ({
    // URL encode the tag to handle emojis and special characters
    tag: encodeURIComponent(tag)
  }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  // Decode the tag for display
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} - TIL`,
    description: `Posts tagged with ${decodedTag}`
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  // Decode the tag to match against post tags
  const decodedTag = decodeURIComponent(tag);

  // Check if tag exists in our available tags
  const allTags = await getAllTags('blog');
  if (!allTags[decodedTag]) {
    notFound();
  }

  const allPosts = await getAllPosts('blog');
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags?.map((t) => t).includes(decodedTag)
  );

  return <TagPageClient posts={filteredPosts} tag={decodedTag} />;
}
