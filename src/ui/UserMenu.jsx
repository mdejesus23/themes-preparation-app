import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiChevronUpDown } from 'react-icons/hi2';
import { MdLogout, MdSettings } from 'react-icons/md';
import useUserStore from '../store/useUserStore';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useLogoutUser } from '../features/authentication/useUserLogout';

// Avatar + name card with a dropdown (Account Settings / Logout).
// `variant="card"` renders the full sidebar footer card; `variant="avatar"`
// renders a compact avatar button for the header bar.
function UserMenu({ variant = 'card' }) {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { logoutUser } = useLogoutUser();
  const ref = useOutsideClick(() => setOpen(false), false);

  const name = user?.username || 'Guest';
  const email = user?.email || '';
  const photo = user?.photo;

  const avatar = photo ? (
    <img
      src={photo}
      alt={name}
      className="h-9 w-9 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green text-sm font-semibold text-white">
      {name.charAt(0).toUpperCase()}
    </span>
  );

  return (
    <div ref={ref} className="relative">
      {variant === 'card' ? (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-3 rounded-xl border border-borderColor bg-bgPrimary p-2.5 text-left transition-colors hover:bg-bgSecondary"
        >
          {avatar}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-textPrimary">
              {name}
            </span>
            <span className="block truncate text-xs text-textSecondary">
              Group Leader
            </span>
          </span>
          <HiChevronUpDown className="shrink-0 text-textSecondary" size={18} />
        </button>
      ) : (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 rounded-full transition-opacity hover:opacity-90"
        >
          {avatar}
        </button>
      )}

      {open && (
        <div
          className={`absolute z-30 w-52 overflow-hidden rounded-xl border border-borderColor bg-bgPrimary py-1 shadow-lg ${
            variant === 'card' ? 'bottom-full left-0 mb-2' : 'right-0 top-full mt-2'
          }`}
        >
          {email && (
            <p className="truncate border-b border-borderColor px-3 py-2 text-xs text-textSecondary">
              {email}
            </p>
          )}
          <NavLink
            to="/admin-user"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-textPrimary transition-colors hover:bg-bgSecondary"
          >
            <MdSettings size={18} /> Account Settings
          </NavLink>
          <button
            onClick={() => {
              setOpen(false);
              logoutUser();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-bgSecondary"
          >
            <MdLogout size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
