import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import readingTime from 'reading-time';
import { processMarkdown } from './markdown';

const _contentDirectory = path.join(process.cwd(), 'data');

export function getAllPosts(type) {
  const allPosts = fs.readdirSync(path.join(process.cwd(), 'data', type));
  const allPostsData = allPosts.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    // Read markdown file as string
    const fullPath = path.join(
      path.join(process.cwd(), 'data', type),
      fileName
    );
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    return {
      ...data,
      date: data.date
        ? typeof data.date === 'string'
          ? data.date
          : data.date.toISOString()
        : new Date().toISOString(),
      content,
      slug
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds(type) {
  const fileNames = fs.readdirSync(path.join(process.cwd(), 'data', type));

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace('.mdx', '')
      }
    };
  });
}

export async function getPostData(type, slug) {
  const fullPath = path.join(
    path.join(process.cwd(), 'data', type),
    `${slug}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Process markdown to HTML with tweet placeholders
  const processedContent = await processMarkdown(content);

  return {
    ...data,
    readingTime: readingTime(content),
    date: data.date
      ? typeof data.date === 'string'
        ? data.date
        : data.date.toISOString()
      : new Date().toISOString(),
    content: processedContent, // Processed HTML content
    slug: slug || null
  };
}
