import Link from 'next/link';

export const metadata = {
  title: 'Bookmarks - Varun Yadav',
  description: 'My bookmarks and useful resources.',
  openGraph: {
    title: 'Bookmarks - Varun Yadav',
    description: 'My bookmarks and useful resources.',
    url: 'https://til.varunyadav.com/bookmarks',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Bookmarks - Varun Yadav',
    description: 'My bookmarks and useful resources.'
  }
};

export default function Bookmarks() {
  return (
    <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
      <main className="p-10 mx-auto container justify-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Bookmarks
        </h1>
        <div className="space-y-4">
          <Link
            className="links block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            href="https://brianlovin.com/bookmarks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Brian Lovin&apos;s Bookmarks
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A curated collection of useful resources and tools
            </p>
          </Link>
        </div>
      </main>
    </section>
  );
}
