import Head from "next/head";
import { getAllPosts } from "../../lib/data";
import { format, parseISO } from "date-fns";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

export default function BlogPage(props) {
  const { title, date, content } = props;
  const hydrateContent = hydrate(content);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="border-b-2 mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="text-gray-600 text-xs">
            {format(parseISO(date), "MMMM dd, yyyy")}
          </div>
        </div>

        <div className="prose">{hydrateContent}</div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const allPosts = getAllPosts();
  const { params } = context;
  const { data, content } = allPosts.find((item) => item.slug === params.slug);
  const mdxSource = await renderToString(content);

  return {
    props: {
      ...data,
      date: data.date.toISOString(),
      content: mdxSource,
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
