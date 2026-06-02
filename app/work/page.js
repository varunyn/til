import ProjectCard from "../../components/project-card";
import { getAllProjects } from "../../lib/work";

export const metadata = {
  title: "Work - Varun Yadav",
  description: "Selected projects and technical demos shipped by Varun Yadav.",
  alternates: {
    canonical: "https://til.varunyadav.com/work",
  },
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="border-gray-200 border-b pb-8 dark:border-gray-700">
        <p className="font-semibold text-sm text-sorbus-700 dark:text-sorbus-300">
          Selected work
        </p>
        <h1 className="mt-2 font-bold text-4xl text-gray-950 tracking-normal sm:text-5xl dark:text-gray-50">
          What I&apos;ve shipped
        </h1>
        <p className="mt-4 max-w-2xl text-gray-700 text-lg leading-relaxed dark:text-gray-300">
          Practical cloud apps, integration patterns, and demos that turn
          infrastructure into working product flows.
        </p>
      </header>

      <section aria-label="Projects" className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
