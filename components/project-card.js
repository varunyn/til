import { Link } from "next-view-transitions";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";

const CARD_BASE =
  "group/project block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-sorbus-200 hover:bg-sorbus-50/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-sorbus-900 dark:hover:bg-gray-900 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey";

export default function ProjectCard({ project, compact = false }) {
  return (
    <Link className={CARD_BASE} href={`/work/${project.slug}`}>
      <article>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-sorbus-50 px-2.5 py-1 font-semibold text-sorbus-800 dark:bg-sorbus-950/45 dark:text-sorbus-200">
            {project.status}
          </span>
          <span className="font-medium text-gray-500 dark:text-gray-400">
            {project.eyebrow}
          </span>
          <span className="text-gray-400 dark:text-gray-500">
            {project.year}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="font-bold text-gray-950 text-lg leading-snug dark:text-gray-50">
            {project.title}
          </h3>
          <FaArrowRight
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-sorbus-600 transition-transform group-hover/project:translate-x-1 dark:text-sorbus-300"
          />
        </div>

        <p className="mt-2 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
          {project.summary}
        </p>

        {compact ? null : (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  className="rounded-md bg-gray-100 px-2.5 py-1 font-medium text-gray-700 text-xs dark:bg-gray-700/70 dark:text-gray-200"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            {project.externalUrl ? (
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-sm text-sorbus-700 dark:text-sorbus-300">
                View project
                <FaArrowUpRightFromSquare
                  aria-hidden="true"
                  className="h-3 w-3"
                />
              </span>
            ) : null}
          </>
        )}
      </article>
    </Link>
  );
}
