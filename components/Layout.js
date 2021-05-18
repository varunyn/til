import Head from "next/head";
import Navigation from "./Navigation";
import * as React from "react";
const Layout = (props) => {
  return (
    <>
      <Head>
        <title>TIL - varunyadav.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="justify-center bg-white dark:bg-darkgrey">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
