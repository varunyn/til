import Head from "next/head";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
        <Head>
          <title>About</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="p-10  mx-auto text-center container justify-center">
          <h4>
            Hi, everyone page is created for sharing my knowledge and using it
            for quick search
          </h4>
        </main>
      </section>
    </div>
  );
}
