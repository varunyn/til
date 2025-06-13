import { getPostData, getAllPostIds } from '@/lib/mdx';
import BlogPostClient from './BlogPostClient';
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

  // Generate dynamic OG image URL
  const ogImageUrl = new URL('/api/og', 'https://til.varunyadav.com');
  ogImageUrl.searchParams.set('title', postData.title);
  ogImageUrl.searchParams.set('description', postData.desc || '');
  ogImageUrl.searchParams.set('type', 'blog');

  return {
    title: postData.title,
    description: postData.desc,
    openGraph: {
      title: postData.title,
      description: postData.desc,
      url: `https://til.varunyadav.com/blog/${slug}`,
      type: 'article',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: postData.title
        }
      ],
      publishedTime: postData.date,
      authors: ['Varun Yadav'],
      tags: postData.tags || []
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.desc,
      images: [ogImageUrl.toString()],
      creator: '@varun1_yadav',
      site: '@varun1_yadav'
    }
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const postData = await getPostData('blog', slug);

  // Generate dynamic OG image URL for JSON-LD
  const ogImageUrl = new URL('/api/og', 'https://til.varunyadav.com');
  ogImageUrl.searchParams.set('title', postData.title);
  ogImageUrl.searchParams.set('description', postData.desc || '');
  ogImageUrl.searchParams.set('type', 'blog');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.desc,
    image: ogImageUrl.toString(),
    datePublished: postData.date,
    dateModified: postData.date,
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
    keywords: postData.tags?.join(', ') || ''
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient post={postData} htmlContent={postData.content} />
      <CopyButtonScript />
      <WebmentionsClient slug={slug} />
    </>
  );
}
