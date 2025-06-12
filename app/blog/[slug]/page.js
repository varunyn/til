import { getPostData, getAllPostIds } from '@/lib/mdx';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import WebmentionsClient from './WebmentionsClient';
import CopyButtonScript from '@/components/CopyButtonScript';

export async function generateStaticParams() {
  const posts = getAllPostIds('blog');
  return posts.map((post) => ({
    slug: post.params.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData('blog', slug);

  return {
    title: postData.title,
    description: postData.desc,
    openGraph: {
      title: postData.title,
      description: postData.desc,
      url: `https://til.varunyadav.com/blog/${slug}`,
      type: 'article',
      images: [postData.ogImage || 'https://til.varunyadav.com/og-image.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.desc,
      images: [postData.ogImage || 'https://til.varunyadav.com/og-image.png']
    }
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const postData = await getPostData('blog', slug);

  const { title, date, content, readingTime, desc, tags, tweets, ogImage } =
    postData;

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
    <div
      className="container dark:bg-darkgrey dark:text-whitedarktheme"
      data-blog-card
      style={{
        '--blog-card-name': `blog-card-${slug}`,
        viewTransitionName: `blog-card-${slug}`
      }}
    >
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
        {desc && (
          <p
            className="text-gray-600 dark:text-gray-400 mb-4"
            data-blog-description
            style={{
              '--blog-description-name': `blog-description-${slug}`,
              viewTransitionName: `blog-description-${slug}`
            }}
          >
            {desc}
          </p>
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
              <time
                dateTime={date}
                data-blog-date
                style={{
                  '--blog-date-name': `blog-date-${slug}`,
                  viewTransitionName: `blog-date-${slug}`
                }}
              >
                {format(parseISO(date), 'MMMM dd, yyyy')}
              </time>
            </span>
          </div>
        </div>
        <div
          className="prose dark:prose-dark selection:bg-blue-200 w-full max-w-none"
          data-blog-content
          style={{
            '--blog-content-name': `blog-content-${slug}`,
            viewTransitionName: `blog-content-${slug}`
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      <CopyButtonScript />
      <WebmentionsClient slug={slug} />
    </div>
  );
}
