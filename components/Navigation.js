import React, { useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className=" sticky-nav my-0 fixed bg-white h-16 my-0 md:my-8 mx-auto  dark:bg-darkgrey  w-full  shadow-md">
      <div className="flex h-full container mx-auto justify-between items-center px-6 md:px-0">
        <a className="dark:bg-darkgrey dark:text-whitedarktheme">TIL</a>
        <ul className="flex flex-row space-x-4 items-center dark:bg-darkgrey dark:text-whitedarktheme md:relative md:left-0">
          <li className="mt-2 sm:mt-0 sm:mr-6">
            <Link href="/">
              <a className="relative">Home</a>
            </Link>
          </li>
          <li className="mt-2 sm:mt-0 sm:mr-6">
            <Link href="/about">
              <a className="relative">About</a>
            </Link>
          </li>
        </ul>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-3 h-12 w-12 oabsolute left-2/4 transform -translate-x-2/4 md:relative md:left-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="h-6 w-6 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? (
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
        </button>
      </div>
    </nav>
  );
};
export default Navigation;
