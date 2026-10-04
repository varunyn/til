"use client";

import { Link } from "next-view-transitions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SearchIcon = () => (
  <svg
    aria-hidden
    className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
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

const WORD_SEPARATOR = /\s+/u;
const FOCUSABLE = "input, button, a[href]";

export default function Search({ posts = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  const searchIndex = useMemo(
    () =>
      posts.map((post) => ({
        post,
        text: [post.title, ...(post.tags ?? [])].join(" ").toLowerCase(),
      })),
    [posts]
  );

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openSearch = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
    inputRef.current?.focus();
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }, []);

  const handleQueryChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  const handleDialogKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const focusable = Array.from(
        event.currentTarget.querySelectorAll(FOCUSABLE)
      );
      const [first] = focusable;
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    },
    [close]
  );

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (dialogRef.current?.open) {
          close();
        } else {
          openSearch();
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [close, openSearch]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const terms = query
    .trim()
    .toLowerCase()
    .split(WORD_SEPARATOR)
    .filter(Boolean);
  const filtered = searchIndex
    .filter(({ text }) => terms.every((term) => text.includes(term)))
    .map(({ post }) => post);

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-3 py-2.5 text-gray-600 text-sm transition-colors hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
        onClick={openSearch}
        ref={triggerRef}
        type="button"
      >
        <SearchIcon />
        <span className="hidden sm:inline">Search articles</span>
        <span className="sm:hidden">Search</span>
        <kbd className="ml-2 hidden rounded border border-gray-200 px-1.5 font-mono text-xs md:inline dark:border-gray-600">
          ⌘K
        </kbd>
      </button>

      <dialog
        aria-label="Search articles"
        className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50 dark:bg-gray-900 dark:text-gray-100"
        onClose={handleClose}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
      >
        <div className="flex items-center gap-2 border-gray-200 border-b py-2 pr-2 pl-3 dark:border-gray-700">
          <SearchIcon />
          <input
            aria-label="Search by title or tag"
            className="min-w-0 flex-1 bg-transparent py-2 text-base placeholder:text-gray-500 focus:outline-none dark:placeholder:text-gray-400"
            onChange={handleQueryChange}
            placeholder="Search by title or tag…"
            ref={inputRef}
            type="search"
            value={query}
          />
          <button
            className="min-h-11 shrink-0 rounded-md px-3 text-gray-600 text-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={close}
            type="button"
          >
            Close
          </button>
        </div>
        <p
          aria-live="polite"
          className="px-4 py-2 text-gray-600 text-sm dark:text-gray-400"
          role="status"
        >
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="max-h-[calc(85dvh-8rem)] overflow-y-auto overscroll-contain pb-2">
          {filtered.length === 0 ? (
            <p className="break-words px-4 py-6 text-center text-gray-600 text-sm dark:text-gray-400">
              {query.trim()
                ? `No results for "${query.trim()}". Try another title or tag.`
                : "No posts found."}
            </p>
          ) : (
            <ul className="space-y-0.5">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    className="block min-h-11 break-words px-4 py-3 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800 dark:hover:bg-gray-800"
                    href={`/blog/${post.slug}`}
                    onClick={close}
                    prefetch={false}
                  >
                    <span className="block font-medium">{post.title}</span>
                    {post.tags?.length > 0 && (
                      <span className="mt-1 block text-gray-600 text-xs dark:text-gray-400">
                        {post.tags.join(" · ")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}
