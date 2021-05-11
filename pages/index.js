import Head from "next/head";
import Link from "next/Link";
import { getAllPosts } from "../lib/data";
import { format, parseISO } from "date-fns";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-4">
        {posts.map((item) => (
          <BlogListItem key={item.slug} {...item}></BlogListItem>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts.map(({ data, content, slug }) => ({
        ...data,
        date: data.date.toISOString(),
        content,
        slug,
      })),
    },
  };
}

function BlogListItem({ slug, title, date, desc }) {
  return (
    <div className="border border-black-100 shadow hover:shadow-md rounded-md p-4 transition duration-200 ease-in">
      <div>
        <Link href={`/blog/${slug}`}>
          <a className="text-lg font-bold"> {title}</a>
        </Link>
      </div>
      <div className="text-gray-600 text-xs">
        {format(parseISO(date), "MMMM dd, yyyy")}
      </div>
      <div>{desc}</div>
    </div>
  );
}
