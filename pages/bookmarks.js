import Head from 'next/head';

export default function Bookmarks() {
  return (
    <div>
      <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
        <Head>
          <title>Bookmarks</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="p-10  mx-auto  container justify-center">
          <p>
            <a className="links" href="https://brianlovin.com/bookmarks">
              Brian Lovin{' '}
            </a>
          </p>
        </main>
      </section>
    </div>
  );
}
