import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';
import { MdLogin } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';
import { MdLibraryMusic } from 'react-icons/md';
import { MdLibraryBooks } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';

function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    // Close the mobile menu when any nav link is clicked
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-headerBg text-headerText px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <NavLink to="/themes" className="shrink-0">
            <img className="w-16" src="/bibleLogo.png" alt="Bible Logo" />
          </NavLink>

          {/* Navigation Links desktop*/}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-base">
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition-colors hover:text-yellow ${
                      isActive ? 'text-yellow' : ''
                    }`
                  }
                >
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/song-book"
                  className={({ isActive }) =>
                    `transition-colors hover:text-yellow ${
                      isActive ? 'text-yellow' : ''
                    }`
                  }
                >
                  Song Book
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/public/office-of-the-readings/684929a313a538c92d5f3312"
                  className={({ isActive }) =>
                    `transition-colors hover:text-yellow ${
                      isActive ? 'text-yellow' : ''
                    }`
                  }
                >
                  Office of the Readings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/public/catechism-of-the-catholic-church/68b45c9e3d17dcca0c489c85"
                  className={({ isActive }) =>
                    `transition-colors hover:text-yellow ${
                      isActive ? 'text-yellow' : ''
                    }`
                  }
                >
                  CCC
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop theme toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {/* Mobile theme toggle */}
            <div className="md:hidden">
              <ThemeToggle isMobile={true} />
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <HiXMark size={34} /> : <HiBars3 size={34} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile nav  */}
      {isOpen && (
        <nav className="bg-headerBg text-headerText md:hidden">
          <ul className="flex flex-col items-center text-base">
            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/song-book"
                className={({ isActive }) =>
                  `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                <MdLibraryMusic size={32} />
                Song Book
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/public/office-of-the-readings/684929a313a538c92d5f3312"
                className={({ isActive }) =>
                  `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                <MdMenuBook size={32} />
                Office of the Readings
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/public/catechism-of-the-catholic-church/68b45c9e3d17dcca0c489c85"
                className={({ isActive }) =>
                  `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                <MdLibraryBooks size={32} />
                CCC
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/login"
                className={({ isActive }) =>
                  `flex w-full items-center justify-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                <MdLogin size={32} />
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
