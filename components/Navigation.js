'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter, FaRss } from 'react-icons/fa6';
import Search from './Search';

const SOCIAL_LINKS = [
  {
    name: 'X',
    href: 'https://twitter.com/varun1_yadav',
    icon: FaSquareXTwitter,
    label: 'X profile'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/varunyn',
    icon: FaGithub,
    label: 'GitHub profile'
  },
  { name: 'RSS', href: '/feed.xml', icon: FaRss, label: 'RSS feed' }
];

const Navigation = ({ searchPosts = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-darkgrey/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold dark:text-whitedarktheme"
            >
              TIL
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Search posts={searchPosts} />
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium dark:text-whitedarktheme hover:text-smalt-600 dark:hover:text-smalt-400 ${
                pathname === '/' ? 'text-smalt-600 dark:text-smalt-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/tags"
              className={`px-3 py-2 text-sm font-medium dark:text-whitedarktheme hover:text-smalt-600 dark:hover:text-smalt-400 ${
                pathname.startsWith('/tags')
                  ? 'text-smalt-600 dark:text-smalt-400'
                  : ''
              }`}
            >
              Tags
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium dark:text-whitedarktheme hover:text-smalt-600 dark:hover:text-smalt-400 ${
                pathname === '/about'
                  ? 'text-smalt-600 dark:text-smalt-400'
                  : ''
              }`}
            >
              About
            </Link>
            <Link
              href="/now"
              className={`px-3 py-2 text-sm font-medium dark:text-whitedarktheme hover:text-smalt-600 dark:hover:text-smalt-400 ${
                pathname === '/now' ? 'text-smalt-600 dark:text-smalt-400' : ''
              }`}
            >
              Now
            </Link>

            {/* Social links */}
            <div
              className="flex items-center gap-1 ml-2 pl-4 border-l border-gray-200 dark:border-gray-700"
              aria-label="Connect"
            >
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  className="p-2 rounded-md hover:text-smalt-600 dark:hover:text-smalt-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-2 rounded-full focus:outline-none"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-800 dark:text-gray-200"
                >
                  {theme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
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
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-2 mr-2 rounded-full focus:outline-none"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-800 dark:text-gray-200"
                >
                  {theme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              )}
            </button>

            {/* Hamburger Menu Button - Only show on mobile */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-black hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t dark:border-gray-700">
          <div className="px-3 py-2">
            <Search posts={searchPosts} />
          </div>
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/'
                ? 'bg-smalt-50 dark:bg-smalt-900 text-smalt-600 dark:text-smalt-300'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Home
          </Link>
          <Link
            href="/tags"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.startsWith('/tags')
                ? 'bg-smalt-50 dark:bg-smalt-900 text-smalt-600 dark:text-smalt-300'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Tags
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/about'
                ? 'bg-smalt-50 dark:bg-smalt-900 text-smalt-600 dark:text-smalt-300'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            About
          </Link>
          <Link
            href="/now"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/now'
                ? 'bg-smalt-50 dark:bg-smalt-900 text-smalt-600 dark:text-smalt-300'
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Now
          </Link>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
            <p className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Connect
            </p>
            <div className="flex gap-2 px-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label={label}
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
