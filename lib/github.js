import { cache } from "react";

// A small build-time snapshot. The rest of /now uses the site's own content.
const getGitHubDataUncached = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/varunyn/repos?per_page=100&sort=pushed&type=owner",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "til-now-page",
        },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!response.ok) {
      return null;
    }
    const repos = await response.json();
    if (!Array.isArray(repos)) {
      return null;
    }
    return repos
      .filter((repo) => !(repo.fork || repo.archived) && repo.pushed_at)
      .sort((first, second) => second.pushed_at.localeCompare(first.pushed_at))
      .slice(0, 3)
      .map((repo) => ({
        date: repo.pushed_at,
        description: repo.description || "",
        name: repo.name,
        url: repo.html_url,
      }));
  } catch {
    return null;
  }
};

export const getGitHubData = cache(getGitHubDataUncached);
