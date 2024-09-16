import { NavLink } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';

function MobileNav({ setIsOpen }) {
  const handleNavLinkClick = () => {
    // Close the mobile menu when any nav link is clicked
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-dark md:hidden">
      <ul className="flex w-full flex-col items-center text-white">
        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/themes"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            All themes
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/admin-themes"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            My themes
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/admin-results"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            My results
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/admin-create-theme"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            Create theme
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/admin-settings"
            className={({ isActive }) =>
              `flex w-full justify-center gap-x-2 px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            <FaRegUser size={28} />
            <span>Settings</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/logout"
            className={({ isActive }) =>
              `flex w-full justify-center gap-x-2 px-2 py-5 text-lg hover:bg-yellow ${
                isActive ? 'bg-yellow text-dark' : ''
              }`
            }
          >
            <MdLogout size={32} />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MobileNav;
