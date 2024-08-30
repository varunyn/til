import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { getTweets } from "@/lib/twitter";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const contentDirectory = path.join(process.cwd(), "data");

export async function getAllPosts(type) {
  const allPosts = await fs.readdir(path.join(contentDirectory, type));
  const allPostsData = await Promise.all(
    allPosts.map(async (fileName) => {
      const slug = fileName.replace(".mdx", "");
      const fullPath = path.join(contentDirectory, type, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      return {
        ...data,
        date: data.date.toISOString(),
        content,
        slug,
      };
    })
  );

  return allPostsData.sort(({ date: a }, { date: b }) => b.localeCompare(a));
}

export async function getAllPostIds(type) {
  const fileNames = await fs.readdir(path.join(contentDirectory, type));

  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(".mdx", ""),
    },
  }));
}

export async function getPostData(type, slug) {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkToc, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ["anchor"] },
          },
          { behaviour: "wrap" },
        ],
      ],
    },
  });

  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);
  const tweets = tweetIDs ? await getTweets(tweetIDs) : null;

  return {
    ...data,
    readingTime: readingTime(content),
    date: data.date.toISOString(),
    content: mdxSource,
    tweetIDs: tweetIDs || [],
    slug: slug || null,
    tweets,
  };
}

// New function for Next.js 14 static params generation
export async function generateStaticParams(type) {
  const posts = await getAllPosts(type);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
