import Link from "next/link";
import PageTransition from "@/components/page-transition";

export const metadata = {
  alternates: {
    canonical: "https://til.varunyadav.com/bookmarks",
  },
  description: "My bookmarks and useful resources.",
  openGraph: {
    description: "My bookmarks and useful resources.",
    title: "Bookmarks - Varun Yadav",
    type: "website",
    url: "https://til.varunyadav.com/bookmarks",
  },
  title: "Bookmarks - Varun Yadav",
  twitter: {
    card: "summary",
    description: "My bookmarks and useful resources.",
    title: "Bookmarks - Varun Yadav",
  },
};

export default function Bookmarks() {
  return (
    <PageTransition>
      <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
        <main className="container mx-auto justify-center p-10">
          <h1 className="mb-8 font-bold text-3xl text-gray-900 dark:text-gray-100">
            Bookmarks
          </h1>
          <div className="space-y-4">
            <Link
              className="links block rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
              href="https://brianlovin.com/bookmarks"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="font-medium text-sorbus-600 hover:underline dark:text-sorbus-400">
                Brian Lovin&apos;s Bookmarks
              </div>
              <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                A curated collection of useful resources and tools
              </p>
            </Link>
          </div>
        </main>
      </section>
    </PageTransition>
  );
}
