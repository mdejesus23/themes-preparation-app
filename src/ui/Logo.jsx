import { NavLink } from 'react-router-dom';

// Gold open-book mark + two-line wordmark, matching the mockup.
function Logo({ to = '/themes', compact = false }) {
  return (
    <NavLink to={to} className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow/15 text-yellow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2Z" />
          <path d="M12 6.5v11" />
          <path d="M12 2.8v1.7" />
          <path d="M12 1.2v1.2" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-headfont text-base font-bold text-textPrimary">
          Themes
        </span>
        {!compact && (
          <span className="text-xs font-medium text-textSecondary">
            Preparation App
          </span>
        )}
      </span>
    </NavLink>
  );
}

export default Logo;
