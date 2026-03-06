import { getTimelineEntries } from "../../lib/timeline";
import NowClient from "./now-client";

export const metadata = {
  title: "Now - Varun Yadav",
  description: "What Varun Yadav is up to now.",
  canonical: "https://til.varunyadav.com/now",
};

export default async function Now() {
  const timelineEntries = getTimelineEntries();
  return <NowClient timelineEntries={timelineEntries} />;
}
