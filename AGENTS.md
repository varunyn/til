## Learned User Preferences

- When adding features, respect static export: avoid relying on runtime API routes; pass build-time data into client components instead.
- Public-facing pages (especially the homepage and blog) should be tuned for mobile layouts and touch targets, not only desktop.
- Performance and React patterns matter: parallel fetches, `React.cache` for duplicate server reads, and deriving tag lists from existing post data instead of extra I/O are preferred when they fit the task.

## Learned Workspace Facts

- This repo is a Next.js app configured with `output: 'export'` (static HTML export), so API routes are not available at runtime in the exported site.
- Navbar article search uses a `{ title, slug }[]` list passed from the root layout as `searchPosts`, not a client fetch to `/api/posts`.
- Tag listing uses `getAllTags` derived from `getAllPosts` so MDX files are not read twice for tags.
- Formatting and linting go through Ultracite with Biome (`ultracite check` / `ultracite fix`); the project does not use Prettier for formatting.
- The homepage layout and typography were inspired by an editorial “notes index” pattern (title + category/tag column); tag labels are linked chips with hashed pastel styles.
