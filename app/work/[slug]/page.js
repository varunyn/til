import { Link } from "next-view-transitions";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaCheck,
} from "react-icons/fa6";
import { getAllProjectIds, getProjectData } from "../../../lib/work";

const BASE_URL = "https://til.varunyadav.com";

export async function generateStaticParams() {
  return getAllProjectIds();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  return {
    title: `${project.title} - Work`,
    description: project.summary,
    alternates: {
      canonical: `${BASE_URL}/work/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${BASE_URL}/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      creator: "@varun1_yadav",
      site: "@varun1_yadav",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectData(slug);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${BASE_URL}/work/${slug}`,
    creator: {
      "@type": "Person",
      name: "Varun Yadav",
      url: "https://varunyadav.com",
    },
    dateCreated: project.year,
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is built from local project frontmatter during static export.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        type="application/ld+json"
      />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          className="group mb-8 inline-flex min-h-11 items-center gap-2 rounded-md px-1 font-medium text-sm text-sorbus-700 transition-colors hover:text-sorbus-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:text-sorbus-300 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey dark:hover:text-sorbus-100"
          href="/work"
        >
          <FaArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          Back to work
        </Link>

        <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <div>
            <header className="border-gray-200 border-b pb-8 dark:border-gray-700">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-md bg-sorbus-50 px-3 py-1.5 font-semibold text-sorbus-800 dark:bg-sorbus-950/45 dark:text-sorbus-200">
                  {project.status}
                </span>
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  {project.eyebrow}
                </span>
                <span className="text-gray-400 dark:text-gray-500">
                  {project.year}
                </span>
              </div>
              <h1 className="font-bold text-4xl text-gray-950 tracking-normal sm:text-5xl dark:text-gray-50">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-gray-700 text-lg leading-relaxed dark:text-gray-300">
                {project.summary}
              </p>
            </header>

            <div
              className="prose prose-lg dark:prose-invert mt-8 max-w-none prose-a:text-sorbus-600 prose-headings:text-gray-950 prose-p:text-gray-700 prose-strong:text-gray-950 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-sorbus-300 dark:prose-headings:text-gray-50 dark:prose-p:text-gray-300 dark:prose-strong:text-white"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Work details render local MDX processed at build time.
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          <aside className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="font-bold text-base text-gray-950 dark:text-gray-50">
              Project notes
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-gray-500 dark:text-gray-400">
                  Role
                </dt>
                <dd className="mt-1 text-gray-800 dark:text-gray-200">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500 dark:text-gray-400">
                  Stack
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      className="rounded-md bg-gray-100 px-2.5 py-1 font-medium text-gray-700 text-xs dark:bg-gray-700/70 dark:text-gray-200"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-gray-200 border-t pt-4 dark:border-gray-700">
              <h3 className="font-semibold text-gray-500 text-sm dark:text-gray-400">
                Highlights
              </h3>
              <ul className="mt-3 space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    className="flex gap-2 text-gray-700 text-sm leading-snug dark:text-gray-300"
                    key={highlight}
                  >
                    <FaCheck
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sorbus-600 dark:text-sorbus-300"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.externalUrl ? (
              <a
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-sorbus-600 px-4 py-2 font-semibold text-sm text-white transition-colors hover:bg-sorbus-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-sorbus-500 dark:text-sorbus-950 dark:focus-visible:ring-sorbus-300 dark:focus-visible:ring-offset-gray-800 dark:hover:bg-sorbus-400"
                href={project.externalUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View walkthrough
                <FaArrowUpRightFromSquare
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
              </a>
            ) : null}
          </aside>
        </article>
      </div>
    </>
  );
}
