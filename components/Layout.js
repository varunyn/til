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
      <main className="pt-16">{props.children}</main>
    </>
  );
};

export default Layout;
