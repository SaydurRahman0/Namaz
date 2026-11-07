import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Islamic Prayer & Dua Guide</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-md">
            The page you are looking for does not exist. It may have been moved or removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}
