import React from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const Blog = ({ slug, title, date, desc }) => {
  return (
    <div className="border mobile:w-auto border-black-100 mx-auto justify-center shadow hover:shadow-md rounded-md p-4 dark:bg-lightgrey dark:text-whitedarktheme">
      <Link href={`/blog/${slug}`}>
        <a>
          <h4 className="text-lg font-bold">{title}</h4>
          <div className="text-gray-600 text-xs">
            {format(parseISO(date), "MMMM dd, yyyy")}
          </div>
          <div>{desc}</div>
        </a>
      </Link>
    </div>
  );
};

export default Blog;
