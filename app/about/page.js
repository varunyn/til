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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <Image
                src="/avatar.png"
                alt="Varun Yadav"
                width={150}
                height={150}
                className="rounded-full shadow-2xl border-4 border-white dark:border-gray-700"
                priority
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-700"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I&apos;m Varun Yadav
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Cloud Engineer passionate about building scalable solutions and
              sharing knowledge with the community
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="https://twitter.com/varun1_yadav"
                className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaXTwitter className="w-5 h-5" />
                <span>X</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/varuncs/"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/varunyn"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
              <Link
                href="mailto:hi@varunyadav.com"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>Email</span>
              </Link>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I&apos;m a Cloud Engineer who loves building scalable solutions
                and exploring new technologies. When I&apos;m not coding, you
                can find me sharing knowledge through blog posts and
                contributing to open source projects.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Pay it forward
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  I believe in sharing knowledge and helping others grow. What
                  I&apos;ve learned from the community, I try to give back
                  through my writing and open source contributions.
                </p>
              </div>
            </div>

            {/* Bucket List Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                Bucket List
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 dark:text-gray-300 line-through">
                    Travel to Japan
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    Completed!
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 dark:text-gray-300 line-through">
                    Skydive Above Dubai
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    Completed!
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                  <span className="text-gray-700 dark:text-gray-300">
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
