import { getAllPosts } from "../lib/mdx";
import HomeClient from "./home-client";

export async function generateMetadata() {
  return {
    alternates: {
      canonical: "https://til.varunyadav.com",
      types: {
        "text/markdown": "https://til.varunyadav.com/index.md",
      },
    },
    description:
      "A collection of code snippets, solutions and things I learn day to day.",
    title: "Today I Learned - Varun Yadav",
  };
}

export default function Home() {
  const allPosts = getAllPosts("blog");

  const notes = allPosts.map(({ slug, title, tags }) => ({
    slug,
    tags,
    title,
  }));

  return <HomeClient allPosts={notes} />;
}
