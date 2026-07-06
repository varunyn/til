import CopyButtonScript from "@/components/copy-button-script";
import { getAllPostIds, getPostData } from "@/lib/mdx";
import BlogPostClient from "./blog-post-client";
import WebmentionsClient from "./webmentions-client";

const BASE_URL = "https://til.varunyadav.com";
const AUTHOR = {
  "@type": "Person",
  name: "Varun Yadav",
  sameAs: [
    "https://github.com/varunyn",
    "https://twitter.com/varun1_yadav",
    "https://www.linkedin.com/in/varuncs/",
  ],
  url: "https://varunyadav.com",
};

function getPostDescription(postData) {
  return (
    postData.desc || `A technical note by Varun Yadav about ${postData.title}.`
  );
}

export async function generateStaticParams() {
  const posts = getAllPostIds("blog");
  return posts.map((post) => ({
    slug: post.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData("blog", slug);
  const description = getPostDescription(postData);

  return {
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/blog/${slug}.md`,
      },
    },
    description,
    openGraph: {
      authors: ["Varun Yadav"],
      description,
      publishedTime: postData.date,
      tags: postData.tags || [],
      title: postData.title,
      type: "article",
      url: `${BASE_URL}/blog/${slug}`,
    },
    title: postData.title,
    twitter: {
      card: "summary_large_image",
      creator: "@varun1_yadav",
      description,
      site: "@varun1_yadav",
      title: postData.title,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const postData = await getPostData("blog", slug);
  const description = getPostDescription(postData);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    articleSection: postData.tags || [],
    author: AUTHOR,
    dateModified: postData.updated || postData.date,
    datePublished: postData.date,
    description,
    headline: postData.title,
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: postData.tags?.join(", ") || "",
    mainEntityOfPage: {
      "@id": `${BASE_URL}/blog/${slug}`,
      "@type": "WebPage",
    },
    publisher: AUTHOR,
    timeRequired: postData.readingTime?.minutes
      ? `PT${postData.readingTime.minutes}M`
      : undefined,
    url: `${BASE_URL}/blog/${slug}`,
    wordCount: postData.readingTime?.words,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", item: BASE_URL, name: "Home", position: 1 },
      { "@type": "ListItem", item: `${BASE_URL}/`, name: "Blog", position: 2 },
      {
        "@type": "ListItem",
        item: `${BASE_URL}/blog/${slug}`,
        name: postData.title,
        position: 3,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <BlogPostClient htmlContent={postData.content} post={postData} />
      <CopyButtonScript />
      <WebmentionsClient slug={slug} />
    </>
  );
}
