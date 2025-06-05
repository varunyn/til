import Head from 'next/head';
import Navigation from './Navigation';
import * as React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>TIL - varunyadav.com</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="webmention"
          href="https://webmention.io/til.varunyadav.com/webmention"
        />
        <link
          rel="pingback"
          href="https://webmention.io/til.varunyadav.com/xmlrpc"
        />
      </Head>
      <Navigation />
      <main className="flex-grow bg-white dark:bg-darkgrey pt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
