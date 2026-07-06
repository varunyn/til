import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Feed } from "feed";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXT_REGEX = /\.mdx?$/u;
const SITE_URL = "https://til.varunyadav.com";

function toValidDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date;
}

async function generate() {
  const feed = new Feed({
    author: {
      email: "hi@varunyadav.com",
      link: "https://varunyadav.com",
      name: "Varun Yadav",
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, Varun Yadav`,
    description: "My personal TIL website.",
    favicon: `${SITE_URL}/favicon.ico`,
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
    generator: "Feed for Node.js",
    id: `${SITE_URL}/`,
    image: `${SITE_URL}/avatar.png`,
    language: "en",
    link: `${SITE_URL}/`,
    title: "Varun Yadav - TIL",
    updated: new Date(),
  });

  const blogDir = path.join(__dirname, "..", "data", "blog");
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map(async (entry) => {
        const { name } = entry;
        const content = await fs.readFile(path.join(blogDir, name), "utf8");
        const frontmatter = matter(content);
        const slug = name.replace(EXT_REGEX, "");
        const date = toValidDate(frontmatter.data.date) ?? new Date();
        const description =
          typeof frontmatter.data.desc === "string"
            ? frontmatter.data.desc
            : "";

        return {
          date,
          description,
          slug,
          title: frontmatter.data.title,
        };
      })
  );

  posts.sort((a, b) => b.date - a.date);

  for (const post of posts) {
    feed.addItem({
      author: [
        {
          email: "hi@varunyadav.com",
          link: "https://varunyadav.com",
          name: "Varun Yadav",
        },
      ],
      content: post.description,
      date: post.date,
      description: post.description,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
    });
  }

  await fs.writeFile("./public/feed.xml", feed.rss2());
}

generate();
