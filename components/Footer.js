import { FaDev, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 mx-auto mt-10">
      <div className="flex items-center mb-4 space-x-1.5 justify-center -ml-2 sm:ml-0 text-lg md:text-2xl">
        <a
          className="p-2 hover:text-indigo-600 dark:hover:text-indigo-300"
          href="https://twitter.com/varun1_yadav"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter focusable="false" />
          <span className="sr-only">Twitter profile</span>
        </a>
        <a
          className="p-2 hover:text-indigo-600 dark:hover:text-indigo-300"
          href="https://github.com/varunyn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub focusable="false" />
          <span className="sr-only">GitHub profile</span>
        </a>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        <p className="inline-flex items-center space-x-1">
          <span>Made by Varun Yadav in {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
