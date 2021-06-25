import React from 'react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

const Blog = ({ slug, title, date, desc }) => {
  return (
    <div className="hover:border mobile:w-auto hover:border-black-100 mx-auto justify-center  hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md p-4  dark:text-whitedarktheme">
      <Link href={`/blog/${slug}`}>
        <a className="flex space-x-7">
          {/* <div className="text-gray-600 blog-date self-end text-sm mr-8 dark:text-whitedarktheme">
            {format(parseISO(date), "MMMM dd, yyyy")}
          </div> */}
          <div className="text-lg font-medium ml-8 dark:text-whitedarktheme">
            {title}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Blog;
