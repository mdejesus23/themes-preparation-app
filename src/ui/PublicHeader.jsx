import { NavLink } from 'react-router-dom';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import Logo from './Logo';
import { publicLinks } from './navConfig';

// On mobile the header is just the logo — navigation lives in the bottom tab
// bar (see PublicMobileNav), matching the authenticated shell.
function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-borderColor bg-headerBg px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo to="/login" />

        <nav className="hidden md:block">
          <ul className="flex items-center gap-2 text-sm">
            {publicLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors ${
                        isActive
                          ? 'bg-sidebarActive text-sidebarActiveText'
                          : 'text-textSecondary hover:bg-bgSecondary hover:text-textPrimary'
                      }`
                    }
                  >
                    <Icon size={19} className="shrink-0" />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <NavLink
                to="/login"
                className="ml-1 flex items-center gap-2 rounded-lg bg-green px-4 py-2 font-semibold text-white transition-colors hover:bg-lightGreen"
              >
                <HiOutlineArrowRightOnRectangle size={19} className="shrink-0" />
                Log in
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;
