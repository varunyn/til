"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import {
  FiBookOpen,
  FiClock,
  FiGithub,
  FiHash,
  FiMoon,
  FiRss,
  FiSun,
  FiUser,
} from "react-icons/fi";
import Search from "./search";

const SECTIONS = [
  { href: "/", icon: FiBookOpen, label: "Notes" },
  { href: "/tags", icon: FiHash, label: "Topics" },
  { href: "/about", icon: FiUser, label: "About" },
  { href: "/now", icon: FiClock, label: "Now" },
];

export default function Navigation({ searchPosts = [] }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";
  const toggleTheme = useCallback(
    () => setTheme(dark ? "light" : "dark"),
    [dark, setTheme]
  );
  const ThemeIcon = mounted && dark ? FiSun : FiMoon;
  const active = (href) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/blog/")
      : pathname.startsWith(href);

  return (
    <>
      <header
        className="site-header"
        style={{ viewTransitionName: "persistent-nav" }}
      >
        <div className="site-header-inner">
          <Link aria-label="TIL home" className="site-wordmark" href="/">
            til<span aria-hidden="true">.</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {SECTIONS.map(({ href, label }) => (
              <Link
                aria-current={active(href) ? "page" : undefined}
                className="desktop-nav-link"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Search posts={searchPosts} />
            <button
              aria-label={
                mounted
                  ? `Switch to ${dark ? "light" : "dark"} mode`
                  : "Toggle color theme"
              }
              className="theme-button"
              onClick={toggleTheme}
              type="button"
            >
              <ThemeIcon aria-hidden="true" size={20} />
            </button>
            <a
              aria-label="GitHub profile"
              className="theme-button hidden md:inline-flex"
              href="https://github.com/varunyn"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiGithub aria-hidden="true" size={20} />
            </a>
            <a
              aria-label="RSS feed"
              className="theme-button hidden md:inline-flex"
              href="/feed.xml"
            >
              <FiRss aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
      </header>
      <nav
        aria-label="Mobile navigation"
        className="mobile-tab-bar md:hidden"
        style={{ viewTransitionName: "mobile-nav" }}
      >
        {SECTIONS.map(({ href, label, icon: Icon }) => (
          <Link
            aria-current={active(href) ? "page" : undefined}
            className="mobile-tab"
            href={href}
            key={href}
          >
            <Icon aria-hidden="true" size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
