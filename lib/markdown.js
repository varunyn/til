export async function processMarkdown(content) {
  try {
    // Import dynamically to avoid SSR issues
    const { unified } = await import('unified');
    const { default: remarkParse } = await import('remark-parse');
    const { default: remarkGfm } = await import('remark-gfm');
    const { default: remarkRehype } = await import('remark-rehype');
    const { default: rehypeSlug } = await import('rehype-slug');
    const { default: rehypePrism } = await import('rehype-prism-plus');
    const { default: rehypeStringify } = await import('rehype-stringify');

    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(content);

    let html = String(result);

    // Post-process to add copy buttons to code blocks
    html = html.replace(
      /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
      (match, preAttrs, codeAttrs, codeContent) => {
        // Extract language from class attribute if present
        const langMatch = (preAttrs + codeAttrs).match(/language-(\w+)/);
        const language = langMatch ? langMatch[1] : '';

        // The content is already processed by Prism, so we don't need to add code-line spans
        // since the structure is already complex with token spans

        return `<div class="relative group"><pre${preAttrs}><code${codeAttrs}>${codeContent}</code></pre><button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-2 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Copy code to clipboard" title="Copy code"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path></svg><span class="ml-1 text-sm hidden sm:inline">Copy</span></div></button></div>`;
      }
    );

    return html;
  } catch (error) {
    console.error('Error processing markdown:', error);
    // Fallback: return content with basic HTML formatting
    return content
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const lines = code
          .trim()
          .split('\n')
          .map((line) => `<span class="code-line">${line}\n</span>`)
          .join('');
        return `<div class="relative group"><pre><code class="code-highlight" data-language="${lang || ''}">${lines}</code></pre><button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-2 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Copy code to clipboard" title="Copy code"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path></svg><span class="ml-1 text-sm hidden sm:inline">Copy</span></div></button></div>`;
      })
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-smalt-600 dark:text-smalt-400 hover:underline">$1</a>'
      )
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h(\d)><\/p>/g, '</h$1>')
      .replace(
        /<p><div class="relative group">/g,
        '<div class="relative group">'
      )
      .replace(/<\/div><\/p>/g, '</div>');
  }
}
