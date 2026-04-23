import { getAllPosts } from "../lib/mdx";
import HomeClient from "./home-client";

export async function generateMetadata() {
  return {
    title: "Today I Learned - Varun Yadav",
    description:
      "A collection of code snippets, solutions and things I learn day to day.",
    alternates: {
      canonical: "https://til.varunyadav.com",
      types: {
        "text/markdown": "https://til.varunyadav.com/index.md",
      },
    },
  };
}

export default function Home() {
  const allPosts = getAllPosts("blog");

  return <HomeClient allPosts={allPosts} />;
}
