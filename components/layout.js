import BackToTop from "./back-to-top";
import Footer from "./footer";
import Navigation from "./navigation";

const Layout = ({ children, searchPosts = [] }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only font-medium focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg focus:ring-2 focus:ring-smalt-500 dark:focus:bg-gray-900 dark:focus:text-white focus:[clip:auto]"
        href="#main-content"
      >
        Skip to content
      </a>
      <Navigation searchPosts={searchPosts} />
      <main
        className="flex-grow bg-white pt-4 dark:bg-darkgrey"
        id="main-content"
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
