import Head from 'next/head';
import { getPostData, getAllPostIds } from '@/lib/mdx';
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import Tweet from '@/components/Tweet';
import Link from 'next/link';

export default function BlogPage(props) {
  const {
    title,
    date,
    content,
    readingTime,
    desc,
    slug,
    tags,
    tweets,
    ogImage
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
    <div className=" container dark:bg-darkgrey dark:text-whitedarktheme">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta
          property="og:url"
          content={`https://til.varunyadav.com/blog/${slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@varun1_yadav" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="flex flex-col justify-center items-start max-w-2xl mobile:p-3 mx-auto w-full">
        <h1 className="font-sans mt-6">{title}</h1>
        <div className="flex w-full my-6 space-x-3 sm:flex-row justify-between">
          <div className="inline-flex">
            {tags.map((tag, id) => {
              return (
                <Link key={id} href={`/tags/${tag}`}>
                  <a className="text-sm fill-current	bg-yellow-200	 rounded border-2 border-yellow-200	 border-opacity-50 text-gray-700 dark:text-black ml-2">
                    {' '}
                    {tag}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col text-sm leading-snug">
            <span>
              <span>{readingTime.text}</span>
              <span className="mx-2">–</span>
              <time>{format(parseISO(date), 'MMMM dd, yyyy')}</time>
            </span>
          </div>
        </div>
        <div className="prose dark:prose-dark selection:bg-blue-200">
          <MDXRemote {...content} components={{ StaticTweet }} />
        </div>
      </article>
      <div className="flex flex-col mt-8 justify-center  items-center  max-w-2xl mx-auto w-full ">
        <h2>Webmentions</h2>
        <ol className="border-dashed border-2 webmention-ol border-light-blue-300 w-full">
          {mentions.map((mention) => {
            if (
              mention['wm-property'] != 'like-of' &&
              mention['wm-target'] === window.location.href
            )
              return (
                <li className="m-6 ">
                  {mention.author.name}&nbsp;
                  <a
                    target="_blank"
                    className="webmention-anchor"
                    href={mention.url}
                  >
                    {mention['wm-property'] === 'repost-of'
                      ? 'reposted this '
                      : 'mentioned this'}
                  </a>
                  &nbsp;on&nbsp;
                  {format(parseISO(mention['wm-received']), 'MMMM dd, yyyy')}
                  <p className="flex-col mt-1 ml-5 text-justify">
                    {mention['content']['text']}
                  </p>
                  <hr className="mt-2" />
                </li>
              );
          })}
        </ol>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);

  return {
    props: {
      ...postData
    }
  };
}

// // This function gets called at build time
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return { paths, fallback: false };
}
