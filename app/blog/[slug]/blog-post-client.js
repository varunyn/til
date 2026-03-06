"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCalendar, FaTags } from "react-icons/fa6";
import { Tweet } from "react-tweet";

const TWEET_PLACEHOLDER_REGEX =
  /<div class="tweet-placeholder[^>]*data-tweet-id="([^"]+)"[^>]*>.*?<\/div>/g;

export default function BlogPostClient({ post, htmlContent }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [processedContent, setProcessedContent] = useState("");
  const [tocItems, setTocItems] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const extractedTweets = [];
    let match;
    let contentWithPlaceholders = htmlContent;
    let placeholderIndex = 0;

    const regex = new RegExp(TWEET_PLACEHOLDER_REGEX.source, "g");
    match = regex.exec(htmlContent);
    while (match !== null) {
      const tweetId = match[1];
      extractedTweets.push({ id: tweetId, index: placeholderIndex });

      contentWithPlaceholders = contentWithPlaceholders.replace(
        match[0],
        `<div class="tweet-marker" data-tweet-index="${placeholderIndex}"></div>`
      );
      placeholderIndex++;
      match = regex.exec(htmlContent);
    }

    setTweets(extractedTweets);
    setProcessedContent(contentWithPlaceholders);
    setIsLoaded(true);
  }, [htmlContent]);

  // Function to render content with embedded tweets
  const renderContentWithTweets = () => {
    if (!processedContent || tweets.length === 0) {
      return { __html: processedContent || htmlContent };
    }

    let finalContent = processedContent;

    // Replace tweet markers with actual tweet components
    for (const tweet of tweets) {
      const marker = `<div class="tweet-marker" data-tweet-index="${tweet.index}"></div>`;
      const tweetComponent = `<div class="tweet-container-${tweet.index} my-6 flex justify-center"></div>`;
      finalContent = finalContent.replace(marker, tweetComponent);
    }

    return { __html: finalContent };
  };

  // Render tweets after content is mounted
  useEffect(() => {
    if (tweets.length > 0 && isLoaded) {
      for (const tweet of tweets) {
        const container = document.querySelector(
          `.tweet-container-${tweet.index}`
        );

        if (container && !container.dataset.rendered) {
          container.dataset.rendered = "true";

          import("react-dom/client")
            .then(({ createRoot }) => {
              const root = createRoot(container);
              root.render(<Tweet id={tweet.id} />);
            })
            .catch((error) => {
              console.error(`Error rendering tweet ${tweet.id}:`, error);
            });
        }
      }
    }
  }, [tweets, isLoaded]);

  // Build table of contents from headings (rehype-slug adds id to h2/h3)
  useEffect(() => {
    if (!(isLoaded && contentRef.current)) {
      return;
    }
    const timer = setTimeout(() => {
      const el = contentRef.current;
      if (!el) {
        return;
      }
      const headings = el.querySelectorAll("h2[id], h3[id]");
      const items = Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent?.trim() || "",
        depth: h.tagName === "H2" ? 2 : 3,
      }));
      setTocItems(items);
    }, 0);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Initialize copy button functionality
  useEffect(() => {
    const handleCopyClick = async (event) => {
      const button = event.currentTarget;
      const codeBlock = button.parentElement.querySelector("code");

      if (!codeBlock) {
        return;
      }

      const codeText = codeBlock.textContent.trim();

      try {
        await navigator.clipboard.writeText(codeText);

        // Update button text and icon
        const textSpan = button.querySelector("span");
        const svg = button.querySelector("svg");

        if (textSpan) {
          textSpan.textContent = "Copied!";
        }
        if (svg) {
          svg.innerHTML =
            '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />';
        }
        button.title = "Copied!";

        // Reset after 2 seconds
        setTimeout(() => {
          if (textSpan) {
            textSpan.textContent = "Copy";
          }
          if (svg) {
            svg.innerHTML =
              '<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>';
          }
          button.title = "Copy code";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    };

    // Add event listeners to all copy buttons after content is loaded
    if (isLoaded) {
      const copyButtons = document.querySelectorAll(".copy-button");
      for (const button of copyButtons) {
        button.addEventListener("click", handleCopyClick);
      }

      return () => {
        for (const button of copyButtons) {
          button.removeEventListener("click", handleCopyClick);
        }
      };
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            className="group mb-8 inline-flex items-center space-x-2 text-smalt-600 transition-colors hover:text-smalt-800 dark:text-smalt-400 dark:hover:text-smalt-200"
            href="/"
          >
            <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Article */}
          <article className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
            {/* Header */}
            <div className="border-gray-200 border-b p-8 dark:border-gray-700">
              <h1
                className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl dark:text-white"
                style={{
                  viewTransitionName: `blog-title-${post.slug}`,
                }}
              >
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex animate-fade-in-delayed flex-wrap items-center gap-4 text-gray-600 text-sm dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaCalendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                {post.readingTime?.text && <span>{post.readingTime.text}</span>}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <FaTags className="h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          className="rounded-md bg-smalt-100 px-2 py-1 font-medium text-smalt-800 text-xs transition-colors hover:bg-smalt-200 dark:bg-smalt-900 dark:text-smalt-200 dark:hover:bg-smalt-800"
                          href={`/tags/${encodeURIComponent(tag)}`}
                          key={tag}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* On this page */}
            {tocItems.length > 1 && (
              <div className="border-gray-200 border-b px-8 pb-4 dark:border-gray-700">
                <h3 className="mb-3 font-semibold text-gray-500 text-xs uppercase tracking-wide dark:text-gray-400">
                  On this page
                </h3>
                <ul className="list-none space-y-2 border-gray-200 border-l-2 pl-2 text-sm dark:border-gray-700">
                  {tocItems.map((item) => (
                    <li
                      className={item.depth === 3 ? "pl-3" : ""}
                      key={item.id}
                    >
                      <a
                        className="-ml-[2px] text-gray-600 hover:text-smalt-600 dark:text-gray-400 dark:hover:text-smalt-400"
                        href={`#${item.id}`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content */}
            <div className="animate-fade-in-delayed p-8" ref={contentRef}>
              <div
                className={`prose prose-lg dark:prose-invert max-w-none prose-code:rounded prose-pre:border prose-pre:border-gray-200 prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-a:text-smalt-600 prose-code:text-smalt-600 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:no-underline prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline dark:prose-pre:border-gray-700 dark:prose-code:bg-gray-800 dark:prose-pre:bg-gray-950 dark:prose-a:text-smalt-400 dark:prose-code:text-smalt-400 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white ${
                  isLoaded ? "opacity-100" : "opacity-90"
                } transition-opacity duration-300`}
                dangerouslySetInnerHTML={renderContentWithTweets()}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
