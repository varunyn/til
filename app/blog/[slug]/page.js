import CopyButtonScript from "@/components/copy-button-script";
import { getAllPostIds, getPostData } from "@/lib/mdx";
import BlogPostClient from "./blog-post-client";
import WebmentionsClient from "./webmentions-client";

const BASE_URL = "https://til.varunyadav.com";
const AUTHOR = {
  "@type": "Person",
  name: "Varun Yadav",
  url: "https://varunyadav.com",
  sameAs: [
    "https://github.com/varunyn",
    "https://twitter.com/varun1_yadav",
    "https://www.linkedin.com/in/varuncs/",
  ],
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
    title: postData.title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
      types: {
        "text/markdown": `${BASE_URL}/blog/${slug}.md`,
      },
    },
    openGraph: {
      title: postData.title,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: postData.date,
      authors: ["Varun Yadav"],
      tags: postData.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description,
      creator: "@varun1_yadav",
      site: "@varun1_yadav",
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
    headline: postData.title,
    description,
    url: `${BASE_URL}/blog/${slug}`,
    inLanguage: "en",
    isAccessibleForFree: true,
    datePublished: postData.date,
    dateModified: postData.updated || postData.date,
    author: AUTHOR,
    publisher: AUTHOR,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    keywords: postData.tags?.join(", ") || "",
    articleSection: postData.tags || [],
    wordCount: postData.readingTime?.words,
    timeRequired: postData.readingTime?.minutes
      ? `PT${postData.readingTime.minutes}M`
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/` },
      {
        "@type": "ListItem",
        position: 3,
        name: postData.title,
        item: `${BASE_URL}/blog/${slug}`,
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
