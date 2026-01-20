import Button from '../ui/Button';

function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bgPrimary text-textPrimary">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-textSecondary">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Button to="/" design="secondary" className="mt-6">
        Go to Homepage
      </Button>
    </div>
  );
}

export default PageNotFound;
