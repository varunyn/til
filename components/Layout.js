import Navigation from './Navigation';
import * as React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow bg-white dark:bg-darkgrey pt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
