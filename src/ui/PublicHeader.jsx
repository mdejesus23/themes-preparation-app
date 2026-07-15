import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { MdLogin, MdMenuBook, MdLibraryMusic, MdLibraryBooks } from 'react-icons/md';
import Logo from './Logo';
import { CCC_BOOK_ID } from './navConfig';

const links = [
  { to: '/song-book', label: 'Song Book', icon: MdLibraryMusic },
  {
    to: '/public/liturgy-of-the-hours',
    label: 'Liturgy of the Hours',
    icon: MdMenuBook,
  },
  {
    to: `/public/catechism-of-the-catholic-church/${CCC_BOOK_ID}`,
    label: 'CCC',
    icon: MdLibraryBooks,
  },
];

function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-borderColor bg-headerBg px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo to="/login" />

          <nav className="hidden md:block">
            <ul className="flex items-center gap-2 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 font-medium transition-colors ${
                        isActive
                          ? 'bg-sidebarActive text-sidebarActiveText'
                          : 'text-textSecondary hover:bg-bgSecondary hover:text-textPrimary'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/login"
                  className="ml-1 rounded-lg bg-green px-4 py-2 font-semibold text-white transition-colors hover:bg-lightGreen"
                >
                  Log in
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            className="text-textPrimary md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiXMark size={30} /> : <HiBars3 size={30} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <nav className="border-b border-borderColor bg-headerBg md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.label}>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to={l.to}
                    className={({ isActive }) =>
                      `flex w-full items-center gap-4 px-5 py-4 text-base transition-colors ${
                        isActive
                          ? 'text-sidebarActiveText'
                          : 'text-textPrimary hover:bg-bgSecondary'
                      }`
                    }
                  >
                    <Icon size={26} />
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/login"
                className="flex w-full items-center gap-4 px-5 py-4 text-base font-semibold text-green hover:bg-bgSecondary"
              >
                <MdLogin size={26} />
                Log in
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default PublicHeader;
