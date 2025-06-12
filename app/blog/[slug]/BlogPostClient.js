'use client';

import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import Tweet from '@/components/Tweet';
import { Link } from 'next-view-transitions';
import BackToTop from '@/components/BackToTop';
import CodeBlock from '@/components/CodeBlock';

export default function BlogPostClient(props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
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
    return <Tweet {...tweet} />;
  };

  const components = {
    StaticTweet,
    pre: (props) => <CodeBlock {...props} />
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="flex flex-col justify-center items-start max-w-2xl px-4 sm:px-0 mx-auto w-full">
        <h1
          className="font-sans mt-6 text-3xl sm:text-4xl font-bold"
          data-blog-title
          style={{
            '--blog-title-name': `blog-title-${slug}`,
            viewTransitionName: `blog-title-${slug}`
          }}
        >
          {title}
        </h1>
        <div className="animate-fade-in-delayed w-full">
          {desc && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
          )}
          <div className="flex flex-col sm:flex-row w-full my-4 sm:my-6 sm:space-x-3 sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
              {tags.map((tag, id) => {
                return (
                  <Link
                    key={id}
                    href={`/tags/${encodeURIComponent(tag)}`}
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
          <div className="prose dark:prose-dark selection:bg-smalt-200 w-full max-w-none">
            {isClient ? (
              <MDXRemote {...content} components={components} />
            ) : (
              <div>Loading content...</div>
            )}
          </div>
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
                        className="webmention-anchor ml-2 text-smalt-600 dark:text-smalt-400 hover:underline"
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
    </div>
  );
}
