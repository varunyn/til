import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/iAWriterQuattroS-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://til.varunyadav.com" />
          <meta name="robots" content="index, follow" />

          <meta charSet="utf-8" />

          {/* JSON-LD structured data for website */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": "https://til.varunyadav.com/",
                  "name": "Today I Learned - Varun Yadav",
                  "description": "A collection of things I've learned in software development, tech, and more.",
                  "author": {
                    "@type": "Person",
                    "name": "Varun Yadav",
                    "url": "https://varunyadav.com"
                  }
                }
              `
            }}
          />
        </Head>
        <body className="text-black bg-white dark:bg-darkgrey dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
