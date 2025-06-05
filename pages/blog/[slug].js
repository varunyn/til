import { getPostData, getAllPostIds } from '@/lib/mdx';
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import Tweet from '@/components/Tweet';
import Link from 'next/link';
import BackToTop from '@/components/BackToTop';
import CodeBlock from '@/components/CodeBlock';
import SEO from '@/components/SEO';

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

  // MDX components with code block support
  const components = {
    StaticTweet,
    // Override pre tag to add copy button
    pre: (props) => <CodeBlock {...props} />
  };

  // Generate JSON-LD structured data for the blog post
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: desc,
    image: ogImage || 'https://til.varunyadav.com/og-image.png',
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: 'Varun Yadav',
      url: 'https://varunyadav.com'
    },
    publisher: {
      '@type': 'Person',
      name: 'Varun Yadav',
      url: 'https://varunyadav.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://til.varunyadav.com/blog/${slug}`
    },
    keywords: tags.join(', ')
  };

  return (
    <div className="container dark:bg-darkgrey dark:text-whitedarktheme">
      <SEO
        title={title}
        description={desc}
        canonicalUrl={`https://til.varunyadav.com/blog/${slug}`}
        ogType="article"
        ogImage={ogImage}
      >
        {/* Add article specific meta tags */}
        <meta property="article:published_time" content={date} />
        <meta property="article:author" content="Varun Yadav" />
        {tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </SEO>

      <article className="flex flex-col justify-center items-start max-w-2xl px-4 sm:px-0 mx-auto w-full">
        <h1 className="font-sans mt-6 text-3xl sm:text-4xl font-bold">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row w-full my-4 sm:my-6 sm:space-x-3 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            {tags.map((tag, id) => {
              return (
                <Link
                  key={id}
                  href={`/tags/${tag}`}
                  className="text-xs sm:text-sm bg-yellow-200 rounded px-2 py-1 border-yellow-200 border-opacity-50 text-gray-700 dark:text-black"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
          <div className="flex text-sm leading-snug text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <span>{readingTime.text}</span>
              <span className="mx-2">–</span>
              <time dateTime={date}>
                {format(parseISO(date), 'MMMM dd, yyyy')}
              </time>
            </span>
          </div>
        </div>
        <div className="prose dark:prose-dark selection:bg-blue-200 w-full max-w-none">
          <MDXRemote {...content} components={components} />
        </div>
      </article>

      <div className="flex flex-col mt-8 justify-center items-center max-w-2xl mx-auto w-full px-4 sm:px-0">
        <h2 className="text-2xl font-bold mb-4">Webmentions</h2>
        <ol className="border-dashed border-2 webmention-ol border-light-blue-300 w-full rounded-lg p-4">
          {mentions.length > 0 ? (
            mentions.map((mention) => {
              if (
                mention['wm-property'] != 'like-of' &&
                mention['wm-target'] === window.location.href
              )
                return (
                  <li
                    className="my-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    key={mention['wm-id']}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{mention.author.name}</span>
                      <a
                        target="_blank"
                        className="webmention-anchor ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                        href={mention.url}
                        rel="noopener noreferrer"
                      >
                        {mention['wm-property'] === 'repost-of'
                          ? 'reposted this'
                          : 'mentioned this'}
                      </a>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {format(
                        parseISO(mention['wm-received']),
                        'MMMM dd, yyyy'
                      )}
                    </div>
                    {mention['content'] && mention['content']['text'] && (
                      <p className="mt-2 text-gray-800 dark:text-gray-300">
                        {mention['content']['text']}
                      </p>
                    )}
                  </li>
                );
              return null;
            })
          ) : (
            <p className="text-center py-4 text-gray-600 dark:text-gray-400">
              No webmentions yet.
            </p>
          )}
        </ol>
      </div>

      <BackToTop />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData('blog', params.slug);

  return {
    props: {
      ...postData
    }
  };
}

// // This function gets called at build time
export async function getStaticPaths() {
  const paths = getAllPostIds('blog');

  return { paths, fallback: false };
}
