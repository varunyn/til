import { getAllPosts } from './mdx';

/**
 * Returns tag counts from post frontmatter. Uses getAllPosts so files are read once.
 */
export function getAllTags(type) {
  const posts = getAllPosts(type);
  const tagCount = {};

  for (const post of posts) {
    if (post.draft === true || !post.tags) continue;
    for (const tag of post.tags) {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1;
    }
  }

  return tagCount;
}
