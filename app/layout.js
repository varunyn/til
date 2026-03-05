import '../styles/globals.css';
import { getAllPosts } from '../lib/mdx';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';
import ConsentManager from '../components/ConsentManager';
import CookieBanner from '../components/CookieBanner';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL('https://til.varunyadav.com'),
  title: 'Today I Learned - Varun Yadav',
  description:
    'A collection of code snippets, solutions and things I learn day to day.',
  referrer: 'strict-origin-when-cross-origin',
  icons: {
    icon: '/favicon.png'
  },
  other: {
    webmention: 'https://webmention.io/til.varunyadav.com/webmention',
    pingback: 'https://webmention.io/til.varunyadav.com/xmlrpc'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0
};

export default async function RootLayout({ children }) {
  const allPosts = getAllPosts('blog');
  const searchPosts = allPosts.map(({ title, slug }) => ({ title, slug }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="webmention"
          href="https://webmention.io/til.varunyadav.com/webmention"
        />
        <link
          rel="pingback"
          href="https://webmention.io/til.varunyadav.com/xmlrpc"
        />
      </head>
      <body suppressHydrationWarning>
        <ConsentManager>
          <Analytics />
          <Providers>
            <Layout searchPosts={searchPosts}>{children}</Layout>
          </Providers>
          <CookieBanner />
        </ConsentManager>
      </body>
    </html>
  );
}
