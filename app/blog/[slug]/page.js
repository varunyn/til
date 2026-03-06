import CopyButtonScript from "@/components/copy-button-script";
import { getAllPostIds, getPostData } from "@/lib/mdx";
import BlogPostClient from "./blog-post-client";
import WebmentionsClient from "./webmentions-client";

export async function generateStaticParams() {
  const posts = getAllPostIds("blog");
  return posts.map((post) => ({
    slug: post.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData("blog", slug);

  return {
    title: postData.title,
    description: postData.desc,
    openGraph: {
      title: postData.title,
      description: postData.desc,
      url: `https://til.varunyadav.com/blog/${slug}`,
      type: "article",
      publishedTime: postData.date,
      authors: ["Varun Yadav"],
      tags: postData.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.desc,
      creator: "@varun1_yadav",
      site: "@varun1_yadav",
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const postData = await getPostData("blog", slug);

  const baseUrl = "https://til.varunyadav.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    description: postData.desc,
    datePublished: postData.date,
    dateModified: postData.date,
    author: {
      "@type": "Person",
      name: "Varun Yadav",
      url: "https://varunyadav.com",
    },
    publisher: {
      "@type": "Person",
      name: "Varun Yadav",
      url: "https://varunyadav.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    keywords: postData.tags?.join(", ") || "",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/` },
      {
        "@type": "ListItem",
        position: 3,
        name: postData.title,
        item: `${baseUrl}/blog/${slug}`,
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
