import fs from "node:fs";
import path from "node:path";

const DATE_HEADING_REGEX = /^#\s*/;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

export function getTimelineEntries() {
  const timelineFilePath = path.join(process.cwd(), "data", "timeline.md");

  try {
    const fileContent = fs.readFileSync(timelineFilePath, "utf8");
    const entries = parseTimelineMarkdown(fileContent);
    return entries;
  } catch (error) {
    console.error("Error reading timeline file:", error);
    return [];
  }
}

function parseTimelineMarkdown(content) {
  const entries = [];

  // Split by ## headings (date sections)
  const sections = content.split("\n## ").filter((section) => section.trim());

  for (const section of sections) {
    const lines = section.split("\n").filter((line) => line.trim());
    if (lines.length === 0) {
      continue;
    }

    // First line is the date (remove # if it's the first section)
    const date = lines[0].replace(DATE_HEADING_REGEX, "").trim();

    // Parse title and tag from bold text
    let title = "";
    let tag = "";
    const contentLines = [];
    let inContent = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("**Title:**")) {
        title = line.replace("**Title:**", "").trim();
      } else if (line.startsWith("**Tag:**")) {
        tag = line.replace("**Tag:**", "").trim();
      } else if (line.startsWith("- ")) {
        inContent = true;
        const content = line.substring(2); // Remove "- "
        contentLines.push(parseMarkdownLinks(content));
      } else if (inContent && line === "") {
        // End of content section
        break;
      }
    }

    // Validate date format (YYYY-MM-DD)
    if (date && DATE_FORMAT_REGEX.test(date)) {
      entries.push({
        date,
        title,
        content: contentLines,
        tag,
      });
    }
  }

  // Sort by date (newest first)
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parseMarkdownLinks(text) {
  LINK_REGEX.lastIndex = 0;
  const parts = [];
  let lastIndex = 0;
  let match = LINK_REGEX.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "link",
      text: match[1],
      url: match[2],
    });
    lastIndex = match.index + match[0].length;
    match = LINK_REGEX.exec(text);
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  // If no links found, return as simple text
  if (parts.length === 0) {
    return [
      {
        type: "text",
        content: text,
      },
    ];
  }

  return parts;
}
