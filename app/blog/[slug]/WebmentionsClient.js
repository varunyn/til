'use client';

import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

export default function WebmentionsClient({ slug }) {
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    fetch(
      `https://webmention.io/api/mentions.jf2?til.varunyadav.com&token=${process.env.NEXT_PUBLIC_WEBMENTION_TOKEN}`
    )
      .then((response) => response.json())
      .then((result) => {
        setMentions(result.children);
      });
  }, []);

  return (
    <div className="flex flex-col mt-8 justify-center items-center max-w-2xl mx-auto w-full px-4 sm:px-0">
      <h2 className="text-2xl font-bold mb-4">Webmentions</h2>
      <ol className="border-dashed border-2 webmention-ol border-light-blue-300 w-full rounded-lg p-4">
        {mentions.length > 0 ? (
          mentions.map((mention) => {
            if (
              mention['wm-property'] != 'like-of' &&
              mention['wm-target'] === window.location.href
            )
              return (
                <li
                  className="my-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  key={mention['wm-id']}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{mention.author.name}</span>
                    <a
                      target="_blank"
                      className="webmention-anchor ml-2 text-smalt-600 dark:text-smalt-400 hover:underline"
                      href={mention.url}
                      rel="noopener noreferrer"
                    >
                      {mention['wm-property'] === 'repost-of'
                        ? 'reposted this'
                        : 'mentioned this'}
                    </a>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {format(parseISO(mention['wm-received']), 'MMMM dd, yyyy')}
                  </div>
                  {mention['content'] && mention['content']['text'] && (
                    <p className="mt-2 text-gray-800 dark:text-gray-300">
                      {mention['content']['text']}
                    </p>
                  )}
                </li>
              );
            return null;
          })
        ) : (
          <p className="text-center py-4 text-gray-600 dark:text-gray-400">
            No webmentions yet.
          </p>
        )}
      </ol>
    </div>
  );
}
