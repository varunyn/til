import "../styles/globals.css";
import Analytics from "../components/analytics";
import ConsentManager from "../components/consent-manager";
import CookieBanner from "../components/cookie-banner";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/mdx";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://til.varunyadav.com"),
  title: "Today I Learned - Varun Yadav",
  description:
    "A collection of code snippets, solutions and things I learn day to day.",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
  },
  other: {
    webmention: "https://webmention.io/til.varunyadav.com/webmention",
    pingback: "https://webmention.io/til.varunyadav.com/xmlrpc",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({ children }) {
  const allPosts = getAllPosts("blog");
  const searchPosts = allPosts.map(({ title, slug }) => ({ title, slug }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/inter-var-latin.woff2"
          rel="preload"
          type="font/woff2"
        />
        <link
          href="/feed.xml"
          rel="alternate"
          title="RSS Feed"
          type="application/rss+xml"
        />
        <link
          href="https://webmention.io/til.varunyadav.com/webmention"
          rel="webmention"
        />
        <link
          href="https://webmention.io/til.varunyadav.com/xmlrpc"
          rel="pingback"
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
