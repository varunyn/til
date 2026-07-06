import { getAllPosts } from "../lib/mdx";
import { getAllTags } from "../lib/tags";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://til.varunyadav.com";
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    {
      changeFrequency: "daily",
      lastModified: currentDate,
      priority: 1.0,
      url: baseUrl,
    },
    {
      changeFrequency: "monthly",
      lastModified: currentDate,
      priority: 0.9,
      url: `${baseUrl}/about`,
    },
    {
      changeFrequency: "weekly",
      lastModified: currentDate,
      priority: 0.8,
      url: `${baseUrl}/now`,
    },
    {
      changeFrequency: "monthly",
      lastModified: currentDate,
      priority: 0.75,
      url: `${baseUrl}/uses`,
    },
    {
      changeFrequency: "weekly",
      lastModified: currentDate,
      priority: 0.8,
      url: `${baseUrl}/tags`,
    },
    {
      changeFrequency: "weekly",
      lastModified: currentDate,
      priority: 0.7,
      url: `${baseUrl}/bookmarks`,
    },
  ];

  // Get all blog posts
  const posts = getAllPosts("blog");
  const blogPages = posts.map((post) => ({
    changeFrequency: "monthly",
    lastModified: post.date ? new Date(post.date) : currentDate,
    priority: 0.8,
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  // Get all tags
  const tagsData = getAllTags("blog");
  const tags = Object.keys(tagsData);
  const tagPages = tags.map((tag) => ({
    changeFrequency: "weekly",
    lastModified: currentDate,
    priority: 0.6,
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
  }));

  return [...staticPages, ...blogPages, ...tagPages];
}
