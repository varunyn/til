import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-8 border-t px-4 py-6 sm:px-6 dark:border-gray-800">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 flex items-center space-x-4 sm:mb-0">
            <a
              aria-label="X profile"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 transition-colors hover:text-smalt-600 focus:outline-none focus:ring-2 focus:ring-smalt-500 focus:ring-offset-2 dark:hover:text-smalt-400"
              href="https://twitter.com/varun1_yadav"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaSquareXTwitter className="h-5 w-5" focusable="false" />
              <span className="sr-only">X profile</span>
            </a>
            <a
              aria-label="GitHub profile"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 transition-colors hover:text-smalt-600 focus:outline-none focus:ring-2 focus:ring-smalt-500 focus:ring-offset-2 dark:hover:text-smalt-400"
              href="https://github.com/varunyn"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithub className="h-5 w-5" focusable="false" />
              <span className="sr-only">GitHub profile</span>
            </a>
          </div>

          <div className="text-gray-500 text-sm dark:text-gray-400">
            <p>© {new Date().getFullYear()} · Made with ❤️ by Varun Yadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
