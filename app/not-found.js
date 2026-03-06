import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-6xl text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="mb-4 font-semibold text-2xl text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600 text-lg dark:text-gray-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="space-x-4">
          <Link
            className="inline-flex items-center rounded-md bg-smalt-600 px-6 py-3 font-medium text-base text-white transition-colors hover:bg-smalt-700"
            href="/"
          >
            Go Home
          </Link>
          <Link
            className="inline-flex items-center rounded-md bg-gray-100 px-6 py-3 font-medium text-base text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            href="/tags"
          >
            Browse Tags
          </Link>
        </div>
      </div>
    </div>
  );
}
