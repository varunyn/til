import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";

import { processMarkdown } from "./markdown";

const WORK_DIR = path.join(process.cwd(), "data", "work");
const MDX_EXTENSION_REGEX = /\.mdx$/;

function normalizeList(value) {
  return Array.isArray(value) ? value : [];
}

function getAllProjectsUncached() {
  const entries = fs.readdirSync(WORK_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const slug = entry.name.replace(MDX_EXTENSION_REGEX, "");
      const fullPath = path.join(WORK_DIR, entry.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        ...data,
        content,
        highlights: normalizeList(data.highlights),
        stack: normalizeList(data.stack),
        slug,
      };
    })
    .sort(({ order: a = 999 }, { order: b = 999 }) => a - b);
}

export const getAllProjects = React.cache(getAllProjectsUncached);

export function getAllProjectIds() {
  const entries = fs.readdirSync(WORK_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => ({
      slug: entry.name.replace(MDX_EXTENSION_REGEX, ""),
    }));
}

async function getProjectDataUncached(slug) {
  const fullPath = path.join(WORK_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await processMarkdown(content);

  return {
    ...data,
    content: processedContent,
    highlights: normalizeList(data.highlights),
    stack: normalizeList(data.stack),
    slug,
  };
}

export const getProjectData = React.cache(getProjectDataUncached);
