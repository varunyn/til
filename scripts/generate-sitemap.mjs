// const fs = require('fs');

// const globby = require('globby');

import {
  writeFile,
  readFile
} from 'fs/promises';
import { existsSync } from 'fs';
import {
  globby
} from 'globby';

// const prettier = require('prettier');

// Self-executing async function
(async () => {
  try {
    // Ignore Next.js specific files and API routes
    const pages = await globby([
      'pages/*.js',
      'data/**/*.mdx',
      '!pages/_*.js',
      '!pages/api',
      '!pages/404.js'
    ]);

    // Current date for lastmod
    const date = new Date().toISOString();
    const sitemapEntries = [];
    
    for (const page of pages) {
      const pathName = page
        .replace('pages', '')
        .replace('data', '')
        .replace('.js', '')
        .replace('.mdx', '');
      
      const route = pathName === '/index' ? '' : pathName;
      const url = `https://til.varunyadav.com${route}`;
      
      // Assign priority based on the page type
      let priority = 0.7; // Default priority
      
      if (pathName === '/index') {
        priority = 1.0; // Home page gets highest priority
      } else if (pathName.startsWith('/blog/')) {
        priority = 0.8; // Blog posts get high priority
      } else if (pathName === '/about' || pathName === '/tags') {
        priority = 0.9; // Important pages get higher priority
      }
      
      // Try to determine last modified date for blog posts
      let lastmod = date;
      if (page.endsWith('.mdx') && existsSync(page)) {
        try {
          const fileContent = await readFile(page, 'utf8');
          const frontmatterMatch = fileContent.match(/---\s+([\s\S]*?)\s+---/);
          
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const dateMatch = frontmatter.match(/date:\s*['"]?(.*?)['"]?\s*(\n|$)/);
            
            if (dateMatch && dateMatch[1]) {
              lastmod = new Date(dateMatch[1]).toISOString();
            }
          }
        } catch (error) {
          console.error(`Error processing ${page}:`, error);
        }
      }
      
      sitemapEntries.push(`
        <url>
          <loc>${url}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>${pathName === '/index' ? 'daily' : 'weekly'}</changefreq>
          <priority>${priority}</priority>
        </url>
      `);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries.join('')}
</urlset>`;

    // Write sitemap to file (using fs/promises)
    await writeFile('public/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
})();