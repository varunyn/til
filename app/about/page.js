import Image from "next/image";
import { Link } from "next-view-transitions";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";
import IconCheck from "../../components/icon-check";

export const metadata = {
  title: "About - Varun Yadav",
  description:
    "Learn more about Varun Yadav, a Cloud Engineer and his bucket list.",
  canonical: "https://til.varunyadav.com/about",
};

export default function About() {
  return (
    <div className="flex min-h-screen items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-4 text-center">
            <div className="relative mb-4 inline-block">
              <Image
                alt="Varun Yadav"
                className="rounded-full border-4 border-white shadow-xl dark:border-gray-700"
                height={100}
                priority
                src="/avatar.png"
                width={100}
              />
              <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-3 border-white bg-green-500 dark:border-gray-700" />
            </div>

            <h1 className="mb-3 font-bold text-3xl text-gray-900 sm:text-4xl dark:text-white">
              Hi, I&apos;m Varun Yadav
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 text-lg dark:text-gray-300">
              Cloud Engineer passionate about building scalable solutions and
              sharing knowledge with the community
            </p>

            {/* Social Links */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                className="flex items-center space-x-1 rounded-lg bg-black px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-gray-800 hover:shadow-lg"
                href="https://twitter.com/varun1_yadav"
              >
                <FaSquareXTwitter className="h-4 w-4" />
                <span>X</span>
              </Link>
              <Link
                className="flex items-center space-x-1 rounded-lg bg-smalt-700 px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-smalt-800 hover:shadow-lg"
                href="https://www.linkedin.com/in/varuncs/"
              >
                <FaLinkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </Link>
              <Link
                className="flex items-center space-x-1 rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-gray-900 hover:shadow-lg"
                href="https://github.com/varunyn"
              >
                <FaGithub className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
              <Link
                className="flex items-center space-x-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-green-700 hover:shadow-lg"
                href="mailto:hi@varunyadav.com"
              >
                <FaEnvelope className="h-4 w-4" />
                <span>Email</span>
              </Link>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* About Section */}
            <div className="rounded-xl bg-white p-5 shadow-lg dark:bg-gray-800">
              <h2 className="mb-3 flex items-center font-bold text-gray-900 text-lg dark:text-white">
                <span className="mr-2 h-6 w-1.5 rounded-full bg-smalt-500" />
                About Me
              </h2>
              <p className="mb-3 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                I&apos;m a Cloud Engineer who loves building scalable solutions
                and exploring new technologies. When I&apos;m not coding, you
                can find me sharing knowledge through blog posts and
                contributing to open source projects.
              </p>
              <div className="rounded-lg bg-smalt-50 p-3 dark:bg-smalt-900/20">
                <h3 className="mb-1 font-semibold text-sm text-smalt-900 dark:text-smalt-300">
                  Pay it forward
                </h3>
                <p className="text-smalt-800 text-xs dark:text-smalt-200">
                  I believe in sharing knowledge and helping others grow. What
                  I&apos;ve learned from the community, I try to give back
                  through my writing and open source contributions.
                </p>
              </div>
            </div>

            {/* Bucket List Section */}
            <div className="rounded-xl bg-white p-5 shadow-lg dark:bg-gray-800">
              <h2 className="mb-3 flex items-center font-bold text-gray-900 text-lg dark:text-white">
                <span className="mr-2 h-6 w-1.5 rounded-full bg-green-500" />
                Bucket List
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 text-sm line-through dark:text-gray-300">
                    Travel to Japan
                  </span>
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-green-800 text-xs dark:bg-green-800 dark:text-green-200">
                    ✓
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 text-sm line-through dark:text-gray-300">
                    Skydive Above Dubai
                  </span>
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-green-800 text-xs dark:bg-green-800 dark:text-green-200">
                    ✓
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-700 text-sm dark:text-gray-300">
                    See Northern Lights
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
