import PageTransition from "@/components/page-transition";
import { getGitHubData } from "../../lib/github";
import { getAllPosts } from "../../lib/mdx";
import { getPersonalBlogData } from "../../lib/personal-blog";
import { getTimelineEntries } from "../../lib/timeline";
import NowOverview from "./now-client";

export const metadata = {
  alternates: { canonical: "https://til.varunyadav.com/now" },
  description: "What Varun Yadav is building, writing, and learning now.",
  title: "Now - Varun Yadav",
};

export default async function Now() {
  const remoteDataPromise = Promise.all([
    getGitHubData(),
    getPersonalBlogData(),
  ]);
  const posts = getAllPosts("blog");
  const timelineEntries = getTimelineEntries();
  const year = new Date().getUTCFullYear();
  const topics = new Set(posts.flatMap((post) => post.tags ?? []));
  const summary = {
    notes: posts.length,
    notesThisYear: posts.filter((post) => post.date.startsWith(String(year)))
      .length,
    topics: topics.size,
    updatesThisYear: timelineEntries.filter((entry) =>
      entry.date.startsWith(String(year))
    ).length,
    year,
  };

  const [githubData, personalBlogData] = await remoteDataPromise;

  return (
    <PageTransition>
      <NowOverview
        githubData={githubData}
        personalBlogData={personalBlogData}
        recentPosts={posts
          .slice(0, 5)
          .map(({ title, slug, date }) => ({ date, slug, title }))}
        summary={summary}
        timelineEntries={timelineEntries}
      />
    </PageTransition>
  );
}
