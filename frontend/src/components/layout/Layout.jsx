import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden min-w-0 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
