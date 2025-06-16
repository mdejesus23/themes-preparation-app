import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';

function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    // Close the mobile menu when any nav link is clicked
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-dark px-4 py-3 text-white">
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
                  to="/office-of-the-readings"
                  className={({ isActive }) =>
                    `transition-colors hover:text-yellow ${
                      isActive ? 'text-yellow' : ''
                    }`
                  }
                >
                  Office of Readings
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <HiXMark size={34} /> : <HiBars3 size={34} />}
          </button>
        </div>
      </header>

      {/* mobile nav  */}
      {isOpen && (
        <nav className="bg-dark text-white md:hidden">
          <ul className="flex flex-col items-center gap-6 text-base">
            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/login"
                className={({ isActive }) =>
                  `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                Log in
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/song-book"
                className={({ isActive }) =>
                  `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                Song Book
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={handleNavLinkClick}
                to="/office-of-the-readings"
                className={({ isActive }) =>
                  `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                    isActive ? 'text-yellow' : ''
                  }`
                }
              >
                Office of Readings
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default PublicHeader;
