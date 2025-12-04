const { promises: fs } = require('fs');
const path = require('path');
const { Feed } = require('feed');
const matter = require('gray-matter');

async function generate() {
  const feed = new Feed({
    title: 'Varun Yadav - TIL',
    description: 'My personal TIL website.',
    id: 'https://til.varunyadav.com/',
    link: 'https://til.varunyadav.com/',
    language: 'en',
    image: 'https://til.varunyadav.com/image.png',
    favicon: 'https://til.varunyadav.com/favicon.ico',
    copyright: `All rights reserved ${new Date().getFullYear()}, Varun Yadav`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: 'https://til.varunyadav.com/feed.xml'
    },
    author: {
      name: 'Varun Yadav',
      email: 'hi@varunyadav.com',
      link: 'https://varunyadav.com'
    }
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'blog'));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'data', 'blog', name)
      );
      const frontmatter = matter(content);

      feed.addItem({
        title: frontmatter.data.title,
        id: 'https://til.varunyadav.com/blog/' + name.replace(/\.mdx?/, ''),
        link: 'https://til.varunyadav.com/blog/' + name.replace(/\.mdx?/, ''),
        description: frontmatter.data.summary,
        content: frontmatter.data.summary,
        author: [
          {
            name: 'Varun Yadav',
            email: 'hi@varunyadav.com',
            link: 'https://varunyadav.com'
          }
        ],
        date: new Date(frontmatter.data.publishedAt)
      });
    })
  );

  await fs.writeFile('./public/feed.xml', feed.rss2());
}

generate();
