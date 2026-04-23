import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const BASE = "https://til.varunyadav.com";
const MDX_SUFFIX = /\.mdx$/u;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const blogDir = path.join(root, "data", "blog");
const outDir = path.join(root, "out");
const outBlogDir = path.join(outDir, "blog");

/** Escape characters that break common-markdown link labels. */
function escapeLinkLabel(text) {
  return String(text)
    .replaceAll("\n", " ")
    .replaceAll("\\", "\\\\")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]");
}

async function main() {
  await fs.access(outDir);
  await fs.mkdir(outBlogDir, { recursive: true });

  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (e) => {
      const slug = e.name.replace(MDX_SUFFIX, "");
      const raw = await fs.readFile(path.join(blogDir, e.name), "utf8");
      const { data, content } = matter(raw);
      const body = matter.stringify(content, data);
      await fs.writeFile(path.join(outBlogDir, `${slug}.md`), body, "utf8");

      const rawDate = data.date;
      let date = "";
      if (typeof rawDate === "string") {
        date = rawDate;
      } else if (rawDate instanceof Date) {
        date = rawDate.toISOString();
      }

      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        desc: typeof data.desc === "string" ? data.desc : "",
        date,
      };
    })
  );

  posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });

  const indexLines = [
    "# Today I Learned",
    "",
    "Author: [Varun Yadav](https://varunyadav.com).",
    "",
    `Human-readable site: ${BASE}/`,
    "",
    "Markdown copies of each note live at `/blog/<slug>.md` (generated at build time from the MDX sources).",
    "",
    "## Posts",
    "",
    ...posts.map(
      (p) =>
        `- [${escapeLinkLabel(p.title)}](${BASE}/blog/${p.slug}.md)${
          p.desc ? ` — ${p.desc}` : ""
        }`
    ),
    "",
  ];
  await fs.writeFile(
    path.join(outDir, "index.md"),
    indexLines.join("\n"),
    "utf8"
  );

  const llmsLines = [
    "# til.varunyadav.com",
    "",
    "> Short technical notes (TIL) by Varun Yadav.",
    "",
    "## Markdown",
    "",
    `Site catalog (Markdown): ${BASE}/index.md`,
    "",
    "Each post: `/blog/<slug>.md` (same slug as the HTML page).",
    "",
    "## Note on Accept: text/markdown",
    "",
    "This site is a static export on GitHub Pages, so the origin cannot return different representations for the same URL based on the `Accept` header. Tools that require that behavior need a host with edge or origin negotiation (see https://acceptmarkdown.com/).",
    "",
    "## Entries",
    "",
    ...posts.map((p) => {
      const label = escapeLinkLabel(p.title);
      const tail = p.desc ? `: ${p.desc}` : "";
      return `- [${label}](${BASE}/blog/${p.slug}.md)${tail}`;
    }),
    "",
  ];
  await fs.writeFile(
    path.join(outDir, "llms.txt"),
    llmsLines.join("\n"),
    "utf8"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
