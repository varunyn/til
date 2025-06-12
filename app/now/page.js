import NowClient from './NowClient';
import { getTimelineEntries } from '../../lib/timeline';

export const metadata = {
  title: 'Now - Varun Yadav',
  description: 'What Varun Yadav is up to now.',
  canonical: 'https://til.varunyadav.com/now'
};

export default async function Now() {
  const timelineEntries = getTimelineEntries();
  return <NowClient timelineEntries={timelineEntries} />;
}
