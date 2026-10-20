import { setTimeout as delay } from "node:timers/promises";
import { cache } from "react";
import snapshot from "../data/personal-blog-snapshot.json" with {
  type: "json",
};

const BLOG_URL = "https://varunyadav.com";
const PUBLIC_KEY_REGEX = /data-key="([a-f0-9]+)"/;

async function fetchBlogResource(url) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      // biome-ignore lint/performance/noAwaitInLoops: Retry only after the previous request fails.
      const response = await fetch(url, {
        headers: { "User-Agent": "til.varunyadav.com blog stats" },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response;
    } catch (error) {
      failure = error;
      if (attempt < 2) {
        await delay(250 * (attempt + 1));
      }
    }
  }
  const reason = failure?.cause?.code ?? failure?.message ?? "Unknown error";
  throw new Error(`Blog request failed at ${new URL(url).pathname}: ${reason}`);
}

async function getPersonalBlogDataUncached() {
  try {
    // Ghost publishes this read-only Content API key in its search/portal script.
    const homepage = await fetchBlogResource(BLOG_URL);
    const html = await homepage.text();
    const key = html.match(PUBLIC_KEY_REGEX)?.[1];
    if (!key) {
      throw new Error(
        "The blog homepage did not include a public Content API key"
      );
    }

    const url = new URL("/ghost/api/content/posts/", BLOG_URL);
    url.search = new URLSearchParams({
      fields: "id,title,url,published_at",
      include: "tags",
      key,
      limit: "100",
      order: "published_at desc",
    }).toString();
    const firstResponse = await fetchBlogResource(url);
    const firstPage = await firstResponse.json();
    const { pages, total } = firstPage.meta.pagination;
    const remainingPages = await Promise.all(
      Array.from({ length: pages - 1 }, async (_, index) => {
        const pageUrl = new URL(url);
        pageUrl.searchParams.set("page", String(index + 2));
        const response = await fetchBlogResource(pageUrl);
        return response.json();
      })
    );
    const archive = [firstPage, ...remainingPages].flatMap(
      (page) => page.posts
    );
    if (archive.length !== total) {
      throw new Error("The public blog archive is incomplete");
    }
    // Ghost also returns custom-routed project entries with a /404/ URL.
    const posts = archive.filter((post) => {
      const postUrl = new URL(post.url);
      return (
        postUrl.origin === BLOG_URL &&
        !["/404", "/404/"].includes(postUrl.pathname)
      );
    });
    const year = new Date().getUTCFullYear();
    const topics = new Set(
      posts.flatMap((post) =>
        (post.tags ?? [])
          .filter((tag) => tag.visibility === "public")
          .map((tag) => tag.slug)
      )
    );
    return {
      asOf: new Date().toISOString(),
      isCached: false,
      postsThisYear: posts.filter((post) =>
        post.published_at.startsWith(String(year))
      ).length,
      recentPosts: posts.slice(0, 3).map((post) => ({
        date: post.published_at,
        title: post.title,
        url: post.url,
      })),
      topics: topics.size,
      totalPosts: posts.length,
      year,
    };
  } catch (error) {
    console.warn(
      `Using varunyadav.com snapshot from ${snapshot.asOf}: ${error.message}`
    );
    return { ...snapshot, isCached: true };
  }
}

export const getPersonalBlogData = cache(getPersonalBlogDataUncached);
