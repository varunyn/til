'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'next-view-transitions';

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default function Search({ posts = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const filtered = query.trim()
    ? posts.filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()))
    : posts;

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full max-w-[14rem] justify-start rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-smalt-500 focus:border-smalt-500 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
      >
        <SearchIcon />
        <span className="hidden sm:inline truncate">Search articles...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 dark:bg-black/60"
            aria-hidden
            onClick={close}
          />
          <div
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl mx-4 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search articles"
          >
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pl-3 pr-2 py-2">
              <SearchIcon />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="flex-1 bg-transparent py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {query.trim()
                    ? `No results for "${query}"`
                    : 'No posts found.'}
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {filtered.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={close}
                        className="block px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
