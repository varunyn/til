import assert from "node:assert/strict";
import test from "node:test";
import { getPersonalBlogData } from "../lib/personal-blog.js";

test("a blog network outage keeps a dated, usable stats snapshot", async (context) => {
  context.mock.method(globalThis, "fetch", () =>
    Promise.reject(new Error("Network unavailable"))
  );
  context.mock.method(console, "warn", () => undefined);
  const data = await getPersonalBlogData();
  assert.ok(
    data,
    "Builds must not export an unavailable stats panel after a network failure"
  );
  assert.equal(data.isCached, true);
  assert.ok(Number.isFinite(Date.parse(data.asOf)));
  assert.ok(data.totalPosts > 0);
  assert.ok(data.recentPosts.length > 0);
});
