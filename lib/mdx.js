import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";

import { processMarkdown } from "./markdown";

function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000,
    words,
  };
}

const CONTENT_DIR = path.join(process.cwd(), "data");

function getAllPostsUncached(type) {
  const dir = path.join(CONTENT_DIR, type);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const allPostsData = entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((entry) => {
      const fileName = entry.name;
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);
      return {
        ...data,
        date: data.date
          ? typeof data.date === "string"
            ? data.date
            : data.date.toISOString()
          : new Date().toISOString(),
        content,
        slug,
      };
    });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
}

/** Dedupes disk reads when layout + page (or tags) request the same list in one render. */
export const getAllPosts = React.cache(getAllPostsUncached);

export function getAllPostIds(type) {
  const dir = path.join(CONTENT_DIR, type);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((entry) => ({
      params: {
        slug: entry.name.replace(/\.mdx$/, ""),
      },
    }));
}

async function getPostDataUncached(type, slug) {
  const fullPath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Process markdown to HTML with tweet placeholders
  const processedContent = await processMarkdown(content);

  return {
    ...data,
    readingTime: getReadingTime(content),
    date: data.date
      ? typeof data.date === "string"
        ? data.date
        : data.date.toISOString()
      : new Date().toISOString(),
    content: processedContent, // Processed HTML content
    slug: slug || null,
  };
}

/** Cached per request so generateMetadata and page share one fetch (server-cache-react). */
export const getPostData = React.cache(getPostDataUncached);
