import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="page-surface flex min-h-screen flex-col items-center justify-center px-4 text-center text-textPrimary">
      <h1 className="font-headfont text-7xl font-bold text-green">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-textSecondary">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lightGreen"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default PageNotFound;
