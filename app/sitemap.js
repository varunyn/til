import { getAllPosts } from "../lib/mdx";
import { getAllTags } from "../lib/tags";
import { getAllProjects } from "../lib/work";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://til.varunyadav.com";
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uses`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Get all blog posts
  const posts = getAllPosts("blog");
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Get all tags
  const tagsData = getAllTags("blog");
  const tags = Object.keys(tagsData);
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const projects = getAllProjects();
  const workPages = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...tagPages, ...workPages];
}
