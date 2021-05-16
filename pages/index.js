import { getAllPosts } from "@/lib/mdx";
import Blog from "../components/Blog";

export default function Home({ posts }) {
  return (
    <div>
      <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
        <div className="space-y-4 p-20 mobile:p-5">
          {posts.map((item) => (
            <Blog key={item.slug} {...item}></Blog>
          ))}
        </div>
      </section>
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
