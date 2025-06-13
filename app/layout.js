import '../styles/globals.css';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';
import Stagewise from '../components/Stagewise';
import ConsentManager from '../components/ConsentManager';
import CookieBanner from '../components/CookieBanner';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL('https://til.varunyadav.com'),
  title: 'Today I Learned - Varun Yadav',
  description:
    'A collection of code snippets, solutions and things I learn day to day.',
  icons: {
    icon: '/favicon.ico'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          <Stagewise />
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
          <CookieBanner />
        </ConsentManager>
      </body>
    </html>
  );
}
