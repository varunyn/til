import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import { getTweets } from '@/lib/twitter';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'data');

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
      date: data.date.toISOString(),
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

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-toc'),
        [
          require('remark-autolink-headings'),
          {
            linkProperties: {
              className: ['anchor']
            }
          }
        ],
        require('remark-code-titles'),
        require('remark-slug')
      ],
      rehypePlugins: [mdxPrism]
    }
  });
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);
  var tweets = null;
  if (tweetIDs != null) {
    tweets = await getTweets(tweetIDs);
  }
  return {
    ...data,
    readingTime: readingTime(content),
    date: data.date.toISOString(),
    content: mdxSource,
    tweetIDs: tweetIDs || [],
    slug: slug || null,
    tweets
  };
}
