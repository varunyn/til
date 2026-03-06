"use client";

import { Link } from "next-view-transitions";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchIcon = () => (
  <svg
    aria-hidden
    className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Search</title>
    <path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Search({ posts = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, close]);

  useEffect(() => {
    if (!(open && dialogRef.current)) {
      return;
    }
    const dialog = dialogRef.current;
    const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable.at(-1);
    first?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const filtered = query.trim()
    ? posts.filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()))
    : posts;

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex min-h-[44px] w-full max-w-[14rem] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white/50 px-3 py-2.5 text-gray-500 text-sm placeholder-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-gray-300 focus:border-smalt-500 focus:outline-none focus:ring-2 focus:ring-smalt-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:border-gray-600"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <SearchIcon />
        <span className="hidden truncate sm:inline">Search articles...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="ml-auto hidden h-5 select-none items-center gap-0.5 rounded border border-gray-200 bg-gray-50 px-1.5 font-medium font-mono text-[10px] text-gray-500 sm:inline-flex dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/50 dark:bg-black/60"
            onClick={close}
          />
          <div
            aria-label="Search articles"
            aria-modal="true"
            className="fixed top-[20%] left-1/2 z-50 mx-4 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
            ref={dialogRef}
            role="dialog"
          >
            <div className="flex items-center gap-2 border-gray-200 border-b py-2 pr-2 pl-3 dark:border-gray-700">
              <SearchIcon />
              <input
                aria-label="Search articles"
                autoFocus
                className="flex-1 bg-transparent py-2 text-gray-900 text-sm placeholder-gray-500 focus:outline-none dark:text-gray-100"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                type="text"
                value={query}
              />
              <kbd className="hidden h-5 select-none items-center rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] text-gray-500 sm:inline-flex dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-gray-500 text-sm dark:text-gray-400">
                  {query.trim()
                    ? `No results for "${query}"`
                    : "No posts found."}
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {filtered.map((post) => (
                    <li key={post.slug}>
                      <Link
                        className="block px-4 py-2.5 text-gray-900 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-100 dark:focus:bg-gray-800 dark:hover:bg-gray-800"
                        href={`/blog/${post.slug}`}
                        onClick={close}
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
