import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { FaXTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa6';
import IconCheck from '../../components/IconCheck';

export const metadata = {
  title: 'About - Varun Yadav',
  description:
    'Learn more about Varun Yadav, a Cloud Engineer and his bucket list.',
  canonical: 'https://til.varunyadav.com/about'
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-smalt-50 to-smalt-100 dark:from-gray-900 dark:to-gray-800 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-4">
            <div className="relative inline-block mb-4">
              <Image
                src="/avatar.png"
                alt="Varun Yadav"
                width={100}
                height={100}
                className="rounded-full shadow-xl border-4 border-white dark:border-gray-700"
                priority
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-3 border-white dark:border-gray-700"></div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Hi, I&apos;m Varun Yadav
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Cloud Engineer passionate about building scalable solutions and
              sharing knowledge with the community
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Link
                href="https://twitter.com/varun1_yadav"
                className="flex items-center space-x-1 px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <FaXTwitter className="w-4 h-4" />
                <span>X</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/varuncs/"
                className="flex items-center space-x-1 px-3 py-1.5 bg-smalt-700 hover:bg-smalt-800 text-white rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/varunyn"
                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href="mailto:hi@varunyadav.com"
                className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Email</span>
              </Link>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-1.5 h-6 bg-smalt-500 rounded-full mr-2"></span>
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                I&apos;m a Cloud Engineer who loves building scalable solutions
                and exploring new technologies. When I&apos;m not coding, you
                can find me sharing knowledge through blog posts and
                contributing to open source projects.
              </p>
              <div className="bg-smalt-50 dark:bg-smalt-900/20 rounded-lg p-3">
                <h3 className="font-semibold text-smalt-900 dark:text-smalt-300 mb-1 text-sm">
                  Pay it forward
                </h3>
                <p className="text-smalt-800 dark:text-smalt-200 text-xs">
                  I believe in sharing knowledge and helping others grow. What
                  I&apos;ve learned from the community, I try to give back
                  through my writing and open source contributions.
                </p>
              </div>
            </div>

            {/* Bucket List Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-1.5 h-6 bg-green-500 rounded-full mr-2"></span>
                Bucket List
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 dark:text-gray-300 line-through text-sm">
                    Travel to Japan
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded-full">
                    ✓
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 dark:text-gray-300 line-through text-sm">
                    Skydive Above Dubai
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded-full">
                    ✓
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
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
