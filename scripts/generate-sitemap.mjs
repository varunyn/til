// const fs = require('fs');

// const globby = require('globby');

import {
  writeFileSync
} from 'fs';
import {
  globby
} from 'globby';
import prettier from 'prettier';

// const prettier = require('prettier');

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.js',
    'data/**/*.mdx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.js'
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('data', '')
                  .replace('.js', '')
                  .replace('.mdx', '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://til.varunyadav.com${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  writeFileSync('public/sitemap.xml', formatted);
})();