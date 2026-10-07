import { notFound } from "next/navigation";
import PageTransition from "@/components/page-transition";
import { getAllPosts } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import TagPageClient from "./tag-page-client";

const BASE_URL = "https://til.varunyadav.com";

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
    alternates: {
      canonical: `${BASE_URL}/tags/${encodeURIComponent(decodedTag)}`,
    },
    description: `Technical notes and links tagged with ${decodedTag} from Varun Yadav's TIL archive.`,
    title: `#${decodedTag} - TIL`,
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
    (post) => post.draft !== true && post.tags?.includes(decodedTag)
  );

  const summaries = filteredPosts.map(({ slug, title, date, desc }) => ({
    date,
    desc: desc ?? null,
    slug,
    title,
  }));

  return (
    <PageTransition key={decodedTag}>
      <TagPageClient posts={summaries} tag={decodedTag} />
    </PageTransition>
  );
}
