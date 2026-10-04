import "../styles/globals.css";
import Analytics from "../components/analytics";
import ConsentManager from "../components/consent-manager";
import CookieBanner from "../components/cookie-banner";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/mdx";
import { fontBody, fontHeading } from "./fonts";
import { Providers } from "./providers";

export const metadata = {
  description:
    "A collection of code snippets, solutions and things I learn day to day.",
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://til.varunyadav.com"),
  other: {
    pingback: "https://webmention.io/til.varunyadav.com/xmlrpc",
    webmention: "https://webmention.io/til.varunyadav.com/webmention",
  },
  referrer: "strict-origin-when-cross-origin",
  title: "Today I Learned - Varun Yadav",
};

export const viewport = {
  initialScale: 1.0,
  themeColor: [
    { color: "#f1f2f3", media: "(prefers-color-scheme: light)" },
    { color: "#222831", media: "(prefers-color-scheme: dark)" },
  ],
  viewportFit: "cover",
  width: "device-width",
};

export default async function RootLayout({ children }) {
  const allPosts = getAllPosts("blog");
  const searchPosts = allPosts.map(({ title, slug, tags }) => ({
    slug,
    tags: tags ?? [],
    title,
  }));

  return (
    <html
      className={`${fontHeading.variable} ${fontBody.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          href="/feed.xml"
          rel="alternate"
          title="RSS Feed"
          type="application/rss+xml"
        />
        <link href="/llms.txt" rel="alternate" type="text/plain" />
        <link href="/index.md" rel="alternate" type="text/markdown" />
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
