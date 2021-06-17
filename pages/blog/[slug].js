import Head from "next/head";
import { getAllPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import readingTime from "reading-time";
import { useEffect, useState } from "react";
import mdxPrism from "mdx-prism";

export default function BlogPage(props) {
  const { title, date, content, readingTime, desc, url, tags } = props;
  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    fetch(
      "https://webmention.io/api/mentions.jf2?til.varunyadav.com&token=Rzhkot6KN8z_itqHnbi3LQ"
    )
      .then((response) => response.json())
      .then((result) => {
        setMentions(result.children);
      });
  }, []);

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

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full">
          <h1 className="mt-6">{title}</h1>
          <div className="flex w-full my-6 space-x-3 sm:flex-row justify-between">
            <div className="inline-flex">
              {tags.map((tag, id) => {
                return (
                  <p
                    className="text-sm fill-current	bg-yellow-200	 rounded border-2 border-yellow-200	 border-opacity-50 text-gray-700 dark:text-gray-300 ml-2"
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
            <MDXRemote {...content} components={content} />
          </div>
        </article>
        <div className="flex flex-col mt-8 justify-center  items-center  max-w-2xl mx-auto w-full ">
          <h2>Webmentions</h2>
          <ol className="border-dashed border-2 border-light-blue-300 w-full">
            {mentions.map((mention) => (
              <li className="m-6 ">
                {mention.author.name}
                <a target="_blank" href={mention.url}>
                  {" "}
                  mentioned this
                </a>{" "}
                on {format(parseISO(mention["wm-received"]), "MMMM dd, yyyy")}
                <div className="flex-col">{mention.content}</div>
                <hr className="mt-2" />
              </li>
            ))}
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
  return {
    props: {
      ...data,
      readingTime: readingTime(content),
      date: data.date.toISOString(),
      content: mdxSource,
      url: params.slug,
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
