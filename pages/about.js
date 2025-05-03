import Head from 'next/head';
import Link from 'next/link';
import IconCheck from '../components/IconCheck';

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme">
        <Head>
          <title>About</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main
          className="p-10  mx-auto  container justify-center w-3/5 mx-auto "
          style={{ width: '60%', margin: '0 auto' }}
        >
          <h4>
            Hi, I am Varun Yadav, I'm a Cloud Engineer. You can find me on{' '}
            <Link className="links" href="https://twitter.com/varun1_yadav">
              Twitter
            </Link>{' '}
            where I talk tech,{' '}
            <Link className="links" href="https://www.linkedin.com/in/varuncs/">
              Linkedin
            </Link>{' '}
            or on{' '}
            <Link className="links" href="https://github.com/varunyn">
              GitHub
            </Link>{' '}
            where I’m building in the open
          </h4>
          <h3 className="mt-8 text-2xl">Pay it forward</h3>
          <p className="mt-4">
            I’ve always been interested in the idea of paying forward what
            knowledge I have—share with others what others have shared with me.{' '}
          </p>
          <h3 className="mt-8 text-2xl">Bucketlist</h3>
          <ul className="grid sm:grid-cols-1 grid-cols-2 gap-4 mt-4">
            <li className="flex items-center space-x-2">
              <div className="w-4 h-4"></div>

              <span>Travel to Japan</span>
            </li>
            <li className="flex items-center space-x-2">
              <IconCheck />
              <span>Skydive Above Dubai</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-4 h-4"></div>
              <span>See Northern Lights</span>
            </li>
          </ul>
        </main>
      </section>
    </div>
  );
}
