import Head from "next/head";
import { getAllPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import readingTime from "reading-time";
import { useEffect, useState } from "react";
import mdxPrism from "mdx-prism";
import { getTweets } from "@/lib/twitter";
import Tweet from "@/components/Tweet";

export default function BlogPage(props) {
  const {
    title,
    date,
    content,
    readingTime,
    desc,
    url,
    tags,
    tweetIDs,
    tweets,
  } = props;
  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    fetch(
      `https://webmention.io/api/mentions.jf2?til.varunyadav.com&token=${process.env.NEXT_PUBLIC_WEBMENTION_TOKEN}`
    )
      .then((response) => response.json())
      .then((result) => {
        setMentions(result.children);
      });
  }, []);

  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    // return id;
    return <Tweet {...tweet} />;
  };

  return (
    <div className=" container min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta
          property="og:url"
          content={`https://til.varunyadav.com/blog/${url}`}
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@varun1_yadav" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article className="flex flex-col justify-center items-start max-w-2xl mobile:p-3 mx-auto w-full">
          <h1 className="mt-6">{title}</h1>
          <div className="flex w-full my-6 space-x-3 sm:flex-row justify-between">
            <div className="inline-flex">
              {tags.map((tag, id) => {
                return (
                  <p
                    className="text-sm fill-current	bg-yellow-200	 rounded border-2 border-yellow-200	 border-opacity-50 text-gray-700 dark:text-black ml-2"
                    key={id}
                  >
                    {tag}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col text-sm leading-snug">
              <span>
                <span>{readingTime.text}</span>
                <span className="mx-2">–</span>
                <time>{format(parseISO(date), "MMMM dd, yyyy")}</time>
              </span>
            </div>
          </div>
          <div className="prose dark:prose-dark ">
            <MDXRemote {...content} components={{ StaticTweet }} />
          </div>
        </article>
        <div className="flex flex-col mt-8 justify-center  items-center  max-w-2xl mx-auto w-full ">
          <h2>Webmentions</h2>
          <ol className="border-dashed border-2 webmention-ol border-light-blue-300 w-full">
            {mentions.map((mention) => {
              if (
                mention["wm-property"] != "like-of" &&
                mention["wm-target"] === window.location.href
              )
                return (
                  <li className="m-6 ">
                    {mention.author.name}&nbsp;
                    <a
                      target="_blank"
                      className="webmention-anchor"
                      href={mention.url}
                    >
                      {mention["wm-property"] === "repost-of"
                        ? "reposted this "
                        : "mentioned this"}
                    </a>
                    &nbsp;on&nbsp;
                    {format(parseISO(mention["wm-received"]), "MMMM dd, yyyy")}
                    <p className="flex-col mt-1 ml-5 text-justify">
                      {mention["content"]["text"]}
                    </p>
                    <hr className="mt-2" />
                  </li>
                );
            })}
          </ol>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const allPosts = getAllPosts();
  const { params } = context;
  const { data, content } = allPosts.find((item) => item.slug === params.slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-toc"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
        require("remark-slug"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);
  var tweets = null;
  if (tweetIDs != null) {
    tweets = await getTweets(tweetIDs);
  }
  return {
    props: {
      ...data,
      readingTime: readingTime(content),
      date: data.date.toISOString(),
      content: mdxSource,
      url: params.slug,
      tweetIDs: tweetIDs || [],
      tweets,
    },
  };
}

// // This function gets called at build time
export async function getStaticPaths() {
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
