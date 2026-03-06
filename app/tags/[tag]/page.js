import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import TagPageClient from "./tag-page-client";

// Disable dynamic params to only allow pre-generated routes
export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = getAllTags("blog");
  return Object.keys(tags).map((tag) => ({
    // URL encode the tag to handle emojis and special characters
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  // Decode the tag for display
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} - TIL`,
    description: `Posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allTags = getAllTags("blog");
  const allPosts = getAllPosts("blog");

  if (!allTags[decodedTag]) {
    notFound();
  }

  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags?.map((t) => t).includes(decodedTag)
  );

  return <TagPageClient posts={filteredPosts} tag={decodedTag} />;
}
