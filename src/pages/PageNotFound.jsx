import Button from '../ui/Button';

function PageNotFound() {
  return (
    <div className="bg-gray-100 text-gray-800 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-red-600 text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Button to="/" design="secondary" className="mt-6">
        Go to Homepage
      </Button>
    </div>
  );
}

export default PageNotFound;
