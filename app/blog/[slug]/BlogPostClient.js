'use client';

import { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { FaCalendar, FaTags, FaArrowLeft } from 'react-icons/fa6';
import { Tweet } from 'react-tweet';

export default function BlogPostClient({ post, htmlContent }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    // Extract tweet IDs and their positions from the content
    const tweetRegex =
      /<div class="tweet-placeholder[^>]*data-tweet-id="([^"]+)"[^>]*>.*?<\/div>/g;
    const extractedTweets = [];
    let match;
    let contentWithPlaceholders = htmlContent;
    let placeholderIndex = 0;

    while ((match = tweetRegex.exec(htmlContent)) !== null) {
      const tweetId = match[1];
      extractedTweets.push({ id: tweetId, index: placeholderIndex });

      // Replace the tweet placeholder with a simple marker
      contentWithPlaceholders = contentWithPlaceholders.replace(
        match[0],
        `<div class="tweet-marker" data-tweet-index="${placeholderIndex}"></div>`
      );
      placeholderIndex++;
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
    tweets.forEach((tweet) => {
      const marker = `<div class="tweet-marker" data-tweet-index="${tweet.index}"></div>`;
      const tweetComponent = `<div class="tweet-container-${tweet.index} my-6 flex justify-center"></div>`;
      finalContent = finalContent.replace(marker, tweetComponent);
    });

    return { __html: finalContent };
  };

  // Render tweets after content is mounted
  useEffect(() => {
    if (tweets.length > 0 && isLoaded) {
      tweets.forEach((tweet) => {
        const container = document.querySelector(
          `.tweet-container-${tweet.index}`
        );

        if (container && !container.dataset.rendered) {
          container.dataset.rendered = 'true';

          // Import and render the tweet
          import('react-dom/client')
            .then(({ createRoot }) => {
              const root = createRoot(container);
              root.render(<Tweet id={tweet.id} />);
            })
            .catch((error) => {
              console.error(`Error rendering tweet ${tweet.id}:`, error);
            });
        }
      });
    }
  }, [tweets, isLoaded]);

  // Initialize copy button functionality
  useEffect(() => {
    const handleCopyClick = async (event) => {
      const button = event.currentTarget;
      const codeBlock = button.parentElement.querySelector('code');

      if (!codeBlock) return;

      const codeText = codeBlock.textContent.trim();

      try {
        await navigator.clipboard.writeText(codeText);

        // Update button text and icon
        const textSpan = button.querySelector('span');
        const svg = button.querySelector('svg');

        if (textSpan) textSpan.textContent = 'Copied!';
        if (svg) {
          svg.innerHTML =
            '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />';
        }
        button.title = 'Copied!';

        // Reset after 2 seconds
        setTimeout(() => {
          if (textSpan) textSpan.textContent = 'Copy';
          if (svg) {
            svg.innerHTML =
              '<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>';
          }
          button.title = 'Copy code';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    // Add event listeners to all copy buttons after content is loaded
    if (isLoaded) {
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach((button) => {
        button.addEventListener('click', handleCopyClick);
      });

      // Cleanup
      return () => {
        copyButtons.forEach((button) => {
          button.removeEventListener('click', handleCopyClick);
        });
      };
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-smalt-50 to-smalt-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-smalt-600 dark:text-smalt-400 hover:text-smalt-800 dark:hover:text-smalt-200 transition-colors mb-8 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Article */}
          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                style={{
                  viewTransitionName: `blog-title-${post.slug}`
                }}
              >
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-delayed">
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <FaTags className="w-4 h-4" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="px-2 py-1 bg-smalt-100 dark:bg-smalt-900 text-smalt-800 dark:text-smalt-200 rounded-md text-xs font-medium hover:bg-smalt-200 dark:hover:bg-smalt-800 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 animate-fade-in-delayed">
              <div
                className={`prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-smalt-600 dark:prose-a:text-smalt-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-smalt-600 dark:prose-code:text-smalt-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 ${
                  isLoaded ? 'opacity-100' : 'opacity-90'
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
