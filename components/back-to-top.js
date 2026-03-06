"use client";

import { useCallback, useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          aria-label="Back to top"
          className="fixed right-4 bottom-4 z-50 rounded-full bg-smalt-500 p-2 text-white shadow-lg transition-all duration-300 hover:bg-smalt-600 focus:outline-none focus:ring-2 focus:ring-smalt-400 sm:right-8 sm:bottom-8 sm:p-3 dark:bg-smalt-600 dark:focus:ring-smalt-500 dark:hover:bg-smalt-700"
          onClick={scrollToTop}
          title="Back to top"
          type="button"
        >
          <svg
            aria-hidden
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10l7-7m0 0l7 7m-7-7v18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      )}
    </>
  );
}
