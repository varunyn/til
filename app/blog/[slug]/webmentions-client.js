"use client";

import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export default function WebmentionsClient({ slug: _slug }) {
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
    <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-center justify-center px-4 sm:px-0">
      <h2 className="mb-4 font-bold text-2xl">Webmentions</h2>
      <ol className="webmention-ol w-full rounded-lg border-2 border-sorbus-300 border-dashed p-4 dark:border-sorbus-700">
        {mentions.length > 0 ? (
          mentions.map((mention) => {
            if (
              mention["wm-property"] !== "like-of" &&
              mention["wm-target"] === window.location.href
            ) {
              return (
                <li
                  className="my-4 border-gray-200 border-b pb-4 last:border-0 last:pb-0 dark:border-gray-700"
                  key={mention["wm-id"]}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{mention.author.name}</span>
                    <a
                      className="webmention-anchor ml-2 text-sorbus-600 hover:underline dark:text-sorbus-400"
                      href={mention.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {mention["wm-property"] === "repost-of"
                        ? "reposted this"
                        : "mentioned this"}
                    </a>
                  </div>
                  <div className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                    {format(parseISO(mention["wm-received"]), "MMMM dd, yyyy")}
                  </div>
                  {mention.content?.text && (
                    <p className="mt-2 text-gray-800 dark:text-gray-300">
                      {mention.content.text}
                    </p>
                  )}
                </li>
              );
            }
            return null;
          })
        ) : (
          <p className="py-4 text-center text-gray-600 dark:text-gray-400">
            No webmentions yet.
          </p>
        )}
      </ol>
    </div>
  );
}
