import Head from 'next/head';

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
            Hi, I am Varun Yadav, I'm a Cloud Engineer. You can find me on{' '}
            <a className="links" href="https://twitter.com/varun1_yadav">
              Twitter
            </a>{' '}
            where I talk tech,{' '}
            <a className="links" href="https://www.linkedin.com/in/varuncs/">
              Linkedin
            </a>{' '}
            or on{' '}
            <a className="links" href="https://github.com/varunyn">
              GitHub
            </a>{' '}
            where I’m building in the open
          </h4>
        </main>
      </section>
    </div>
  );
}
