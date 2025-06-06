import fs from 'fs';
import path from 'path';

export function getTimelineEntries() {
  const timelineFilePath = path.join(process.cwd(), 'data', 'timeline.md');

  try {
    const fileContent = fs.readFileSync(timelineFilePath, 'utf8');
    const entries = parseTimelineMarkdown(fileContent);
    return entries;
  } catch (error) {
    console.error('Error reading timeline file:', error);
    return [];
  }
}

function parseTimelineMarkdown(content) {
  const entries = [];

  // Split by ## headings (date sections)
  const sections = content.split('\n## ').filter((section) => section.trim());

  sections.forEach((section) => {
    const lines = section.split('\n').filter((line) => line.trim());
    if (lines.length === 0) return;

    // First line is the date (remove # if it's the first section)
    const date = lines[0].replace(/^#\s*/, '').trim();

    // Parse title and tag from bold text
    let title = '';
    let tag = '';
    let contentLines = [];
    let inContent = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('**Title:**')) {
        title = line.replace('**Title:**', '').trim();
      } else if (line.startsWith('**Tag:**')) {
        tag = line.replace('**Tag:**', '').trim();
      } else if (line.startsWith('- ')) {
        inContent = true;
        const content = line.substring(2); // Remove "- "
        contentLines.push(parseMarkdownLinks(content));
      } else if (inContent && line === '') {
        // End of content section
        break;
      }
    }

    // Validate date format (YYYY-MM-DD)
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      entries.push({
        date,
        title,
        content: contentLines,
        tag
      });
    }
  });

  // Sort by date (newest first)
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parseMarkdownLinks(text) {
  // Parse markdown links [text](url) and convert to objects
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add the link
    parts.push({
      type: 'link',
      text: match[1],
      url: match[2]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  // If no links found, return as simple text
  if (parts.length === 0) {
    return [
      {
        type: 'text',
        content: text
      }
    ];
  }

  return parts;
}
