import Head from 'next/head';
import Navigation from './Navigation';
import * as React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>TIL - varunyadav.com</title>
        <link rel="icon" href="/favicon.ico" />

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
      <main className="min-h-screen bg-white dark:bg-darkgrey">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
