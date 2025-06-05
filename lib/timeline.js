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
        contentLines.push(line.substring(2)); // Remove "- "
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
