import { FaDev, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 mt-8 border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <a
              className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://twitter.com/varun1_yadav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
            >
              <FaTwitter className="h-5 w-5" focusable="false" />
              <span className="sr-only">Twitter profile</span>
            </a>
            <a
              className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://github.com/varunyn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub className="h-5 w-5" focusable="false" />
              <span className="sr-only">GitHub profile</span>
            </a>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} · Made with ❤️ by Varun Yadav</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
