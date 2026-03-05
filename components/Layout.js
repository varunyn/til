import Navigation from './Navigation';
import Footer from './Footer';
import BackToTop from './BackToTop';

const Layout = ({ children, searchPosts = [] }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:w-auto focus:h-auto focus:overflow-visible focus:[clip:auto] focus:bg-white dark:focus:bg-gray-900 focus:text-gray-900 dark:focus:text-white focus:ring-2 focus:ring-smalt-500 focus:rounded-md focus:shadow-lg font-medium"
      >
        Skip to content
      </a>
      <Navigation searchPosts={searchPosts} />
      <main
        id="main-content"
        className="flex-grow bg-white dark:bg-darkgrey pt-4"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
