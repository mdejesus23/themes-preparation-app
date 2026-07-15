import AdminThemes from '../features/admin/AdminThemes';

function MyThemes() {
  return (
    <>
      <div className="mb-2">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          My Themes
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Create and manage the themes you own.
        </p>
      </div>
      <AdminThemes />
    </>
  );
}

export default MyThemes;
