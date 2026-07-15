import { HiPlus } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import ThemesList from '../features/preparation/ThemesList';

function AllThemes() {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
            All Preparation Themes
          </h1>
          <p className="mt-1 text-sm text-textSecondary">
            Choose a theme to start preparing for your celebration.
          </p>
        </div>
        <Link
          to="/admin-themes"
          className="flex items-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lightGreen"
        >
          <HiPlus size={18} /> New Theme
        </Link>
      </div>

      <ThemesList />
    </>
  );
}

export default AllThemes;
