import { getTimelineEntries } from "../../lib/timeline";
import NowClient from "./now-client";

export const metadata = {
  alternates: {
    canonical: "https://til.varunyadav.com/now",
  },
  description: "What Varun Yadav is up to now.",
  title: "Now - Varun Yadav",
};

export default async function Now() {
  const timelineEntries = getTimelineEntries();
  return <NowClient timelineEntries={timelineEntries} />;
}
