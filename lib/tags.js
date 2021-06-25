import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getAllPosts } from './mdx';

const root = process.cwd();

export async function getAllTags(type) {
  const files = await getAllPosts(type);

  let tagCount = {};
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(
      path.join(root, 'data', `${file.slug}.mdx`),
      'utf8'
    );
    const { data } = matter(source);
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });

  return tagCount;
}
