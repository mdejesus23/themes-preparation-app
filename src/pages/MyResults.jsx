import Results from '../features/admin/Results';

function MyResults() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          My Results
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Your saved preparation results.
        </p>
      </div>
      <Results />
    </>
  );
}

export default MyResults;
