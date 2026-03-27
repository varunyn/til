"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaRss, FaSquareXTwitter } from "react-icons/fa6";
import Search from "./search";

const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://twitter.com/varun1_yadav",
    icon: FaSquareXTwitter,
    label: "X profile",
  },
  {
    name: "GitHub",
    href: "https://github.com/varunyn",
    icon: FaGithub,
    label: "GitHub profile",
  },
  { name: "RSS", href: "/feed.xml", icon: FaRss, label: "RSS feed" },
];

const Navigation = ({ searchPosts = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const nextThemeLabel =
    resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-gray-200/50 border-b bg-page-bg/90 shadow-sm backdrop-blur-md dark:border-gray-700/50 dark:bg-darkgrey/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link
              className="font-bold text-xl dark:text-whitedarktheme"
              href="/"
            >
              TIL
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Search posts={searchPosts} />
            <Link
              className={`px-3 py-2 font-medium text-sm hover:text-sorbus-600 dark:text-whitedarktheme dark:hover:text-sorbus-400 ${
                pathname === "/" ? "text-sorbus-600 dark:text-sorbus-400" : ""
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`px-3 py-2 font-medium text-sm hover:text-sorbus-600 dark:text-whitedarktheme dark:hover:text-sorbus-400 ${
                pathname.startsWith("/tags")
                  ? "text-sorbus-600 dark:text-sorbus-400"
                  : ""
              }`}
              href="/tags"
            >
              Tags
            </Link>
            <Link
              className={`px-3 py-2 font-medium text-sm hover:text-sorbus-600 dark:text-whitedarktheme dark:hover:text-sorbus-400 ${
                pathname === "/about"
                  ? "text-sorbus-600 dark:text-sorbus-400"
                  : ""
              }`}
              href="/about"
            >
              About
            </Link>
            <Link
              className={`px-3 py-2 font-medium text-sm hover:text-sorbus-600 dark:text-whitedarktheme dark:hover:text-sorbus-400 ${
                pathname === "/now"
                  ? "text-sorbus-600 dark:text-sorbus-400"
                  : ""
              }`}
              href="/now"
            >
              Now
            </Link>

            {/* Social links */}
            <nav
              aria-label="Connect"
              className="ml-2 flex items-center gap-1 border-gray-200 border-l pl-4 dark:border-gray-700"
            >
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  aria-label={label}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 hover:text-sorbus-600 focus:outline-none focus:ring-2 focus:ring-sorbus-500 focus:ring-offset-2 dark:hover:bg-gray-800 dark:hover:text-sorbus-400"
                  href={href}
                  key={label}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <button
              aria-label={nextThemeLabel}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-sorbus-500 focus:ring-offset-2 dark:bg-gray-800/60 dark:hover:bg-gray-700/70"
              onClick={() => setTheme(nextTheme)}
              type="button"
            >
              {mounted && (
                <svg
                  aria-hidden
                  className="h-5 w-5 text-gray-800 dark:text-gray-200"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{nextThemeLabel}</title>
                  {resolvedTheme === "dark" ? (
                    <path
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  ) : (
                    <path
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  )}
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Controls - Only show on mobile */}
          <div className="flex items-center md:hidden">
            {/* Dark Mode Toggle for Mobile */}
            <button
              aria-label={nextThemeLabel}
              className="mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-sorbus-500 focus:ring-offset-2 dark:bg-gray-800/60 dark:hover:bg-gray-700/70"
              onClick={() => setTheme(nextTheme)}
              type="button"
            >
              {mounted && (
                <svg
                  aria-hidden
                  className="h-5 w-5 text-gray-800 dark:text-gray-200"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{nextThemeLabel}</title>
                  {resolvedTheme === "dark" ? (
                    <path
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  ) : (
                    <path
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  )}
                </svg>
              )}
            </button>

            {/* Hamburger Menu Button - Only show on mobile */}
            <button
              aria-expanded={isMenuOpen}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-sorbus-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  aria-hidden="true"
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="space-y-1 border-t px-2 pt-2 pb-3 sm:px-3 dark:border-gray-700">
          <div className="px-3 py-2">
            <Search posts={searchPosts} />
          </div>
          <Link
            className={`block rounded-md px-3 py-2 font-medium text-base ${
              pathname === "/"
                ? "bg-sorbus-50 text-sorbus-600 dark:bg-sorbus-900 dark:text-sorbus-300"
                : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`block rounded-md px-3 py-2 font-medium text-base ${
              pathname.startsWith("/tags")
                ? "bg-sorbus-50 text-sorbus-600 dark:bg-sorbus-900 dark:text-sorbus-300"
                : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
            href="/tags"
          >
            Tags
          </Link>
          <Link
            className={`block rounded-md px-3 py-2 font-medium text-base ${
              pathname === "/about"
                ? "bg-sorbus-50 text-sorbus-600 dark:bg-sorbus-900 dark:text-sorbus-300"
                : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`block rounded-md px-3 py-2 font-medium text-base ${
              pathname === "/now"
                ? "bg-sorbus-50 text-sorbus-600 dark:bg-sorbus-900 dark:text-sorbus-300"
                : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
            href="/now"
          >
            Now
          </Link>

          <div className="mt-2 border-gray-200 border-t pt-4 dark:border-gray-700">
            <p className="mb-2 px-3 font-medium text-gray-500 text-sm dark:text-gray-400">
              Connect
            </p>
            <div className="flex gap-2 px-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  aria-label={label}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sorbus-500 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800"
                  href={href}
                  key={label}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
