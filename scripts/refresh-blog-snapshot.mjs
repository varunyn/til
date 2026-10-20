import { writeFile } from "node:fs/promises";
import { getPersonalBlogData } from "../lib/personal-blog.js";

const data = await getPersonalBlogData();
if (data.isCached) {
  throw new Error(
    "The live blog could not be fetched; the saved snapshot was left unchanged."
  );
}
const { isCached: _isCached, ...snapshot } = data;
await writeFile(
  new URL("../data/personal-blog-snapshot.json", import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`
);
