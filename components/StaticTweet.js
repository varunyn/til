'use client';

import { Tweet } from 'react-tweet';

export default function StaticTweet({ id }) {
  return (
    <div className="my-6 flex justify-center">
      <Tweet id={id} />
    </div>
  );
}
