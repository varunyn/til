const SECTIONS = [
  { id: "daily-drivers", label: "Daily drivers" },
  { id: "workspace", label: "Workspace" },
  { id: "audio", label: "Audio" },
  { id: "photography", label: "Photography" },
  { id: "software", label: "Software" },
  { id: "ai-tools", label: "AI tools" },
  { id: "everyday-carry", label: "Everyday carry" },
  { id: "home", label: "Home" },
];

export const metadata = {
  title: "Uses - Varun Yadav",
  description:
    "Hardware, software, and everyday tools I rely on — a living snapshot.",
  alternates: {
    canonical: "https://til.varunyadav.com/uses",
  },
};

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 pr-[max(1rem,env(safe-area-inset-right))] pb-16 pl-[max(1rem,env(safe-area-inset-left))] sm:pt-10 sm:pr-6 sm:pl-6">
      <article className="prose prose-lg dark:prose-invert prose-h2:mt-12 prose-h3:mt-8 prose-h4:mt-0 prose-h4:mb-2 max-w-none prose-h2:scroll-mt-24 prose-h2:border-gray-200 prose-h2:border-b prose-h2:pb-2 prose-headings:font-heading prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-lg prose-h4:text-base prose-p:text-page-fg/90 prose-h1:tracking-tight prose-h2:first:mt-0 dark:prose-h2:border-gray-700 dark:prose-p:text-gray-300">
        <header>
          <h1 className="font-heading">Stuff I use</h1>
          <p className="lead text-balance">
            Hardware, software, and everyday tools I rely on for development,
            writing, homelab projects, and keeping useful notes close at hand.
            Inspired by sites like{" "}
            <a
              href="https://usesthis.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Uses This
            </a>
            .
          </p>
        </header>

        <nav aria-label="On this page">
          <h2 className="mb-3 font-heading font-semibold text-[0.95rem] text-gray-900 uppercase tracking-wide dark:text-gray-100">
            Sections
          </h2>
          <ol className="not-prose list-decimal space-y-1 pl-5 text-sm">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  className="rounded-sm font-medium text-sorbus-600 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-sorbus-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 dark:text-sorbus-300 dark:decoration-gray-600 dark:focus-visible:ring-offset-gray-900 dark:hover:text-sorbus-200"
                  href={`#${id}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <section
          aria-labelledby="daily-drivers-heading"
          className="rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="daily-drivers"
        >
          <h2 id="daily-drivers-heading">Daily drivers</h2>
          <ItemPlaceholder
            body="Macbook M5 Pro 48gb RAM, 1tb SSD, 14inch display"
            title="Laptop"
          />
          <ItemPlaceholder
            body="GMKTec Mini PC, 12gb RAM, 512gb SSD for home server"
            title="Mini PC"
          />
        </section>

        <section
          aria-labelledby="workspace-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="workspace"
        >
          <h2 id="workspace-heading">Workspace</h2>
          <ItemPlaceholder
            body="Why it works for you — ergonomics, size, standing vs sitting."
            title="Chair / desk"
          />
          <ItemPlaceholder
            body="Monitor, keyboard, mouse, desk mat, lighting."
            title="Display & input"
          />
        </section>

        <section
          aria-labelledby="audio-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="audio"
        >
          <h2 id="audio-heading">Audio</h2>
          <ItemPlaceholder
            body="What you use for calls, music, travel."
            title="Headphones / earbuds"
          />
        </section>

        <section
          aria-labelledby="photography-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="photography"
        >
          <h2 id="photography-heading">Photography</h2>
          <ItemPlaceholder
            body="Gear, phone workflow, or editing stack."
            title="Cameras or apps"
          />
        </section>

        <section
          aria-labelledby="software-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="software"
        >
          <h2 id="software-heading">Software</h2>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Group by theme (design, dev, productivity) — bullet lists work well
            here.
          </p>
          <ul className="not-prose mt-4 list-disc space-y-2 pl-5 text-gray-700 text-sm dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">
                Category A
              </strong>{" "}
              — tool one, tool two.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">
                Category B
              </strong>{" "}
              — tool one, tool two.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="ai-tools-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="ai-tools"
        >
          <h2 id="ai-tools-heading">AI tools</h2>
          <ItemPlaceholder
            body="What you use for coding, writing, images — keep it honest."
            title="Assistants & workflows"
          />
        </section>

        <section
          aria-labelledby="everyday-carry-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="everyday-carry"
        >
          <h2 id="everyday-carry-heading">Everyday carry</h2>
          <ItemPlaceholder
            body="Optional section; delete if you do not carry much."
            title="Watch / bag / small accessories"
          />
        </section>

        <section
          aria-labelledby="home-heading"
          className="mt-6 rounded-xl bg-gray-50/70 px-4 py-5 dark:bg-gray-900/35"
          id="home"
        >
          <h2 id="home-heading">Home</h2>
          <ItemPlaceholder
            body="Entertainment and smart-home stuff."
            title="TV / audio / network"
          />
        </section>

        <footer className="not-prose mt-12 border-gray-200 border-t pt-8 text-gray-600 text-sm dark:border-gray-700 dark:text-gray-400">
          <p>
            This list changes over time. Questions? Reach me at{" "}
            <a
              className="font-medium text-sorbus-600 underline decoration-gray-300 underline-offset-2 hover:text-sorbus-700 dark:text-sorbus-400 dark:hover:text-sorbus-300"
              href="mailto:hi@varunyadav.com"
            >
              hi@varunyadav.com
            </a>
            .
          </p>
        </footer>
      </article>
    </div>
  );
}

function ItemPlaceholder({ title, body }) {
  return (
    <div className="not-prose mb-8">
      <h4 className="m-0 font-heading font-semibold text-base text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="mt-2 border-gray-100 border-l-2 pl-4 text-gray-600 text-sm leading-relaxed dark:border-gray-700 dark:text-gray-400">
        {body}
      </p>
    </div>
  );
}
