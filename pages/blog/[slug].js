import Head from "next/head";
import { getAllPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import readingTime from "reading-time";

export default function BlogPage(props) {
  const { title, date, content, readingTime } = props;
  return (
    <div className=" container min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            {title}
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
            <div className="flex items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                {format(parseISO(date), "MMMM dd, yyyy")}
              </p>
            </div>
            <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
              {readingTime.text}
            </p>
          </div>
          <div className="prose dark:prose-dark ">
            <MDXRemote {...content} components={content} />
          </div>
        </article>
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
        require("remark-slug"),
      ],
    },
  });
  return {
    props: {
      ...data,
      readingTime: readingTime(content),
      date: data.date.toISOString(),
      content: mdxSource,
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
