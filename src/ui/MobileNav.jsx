import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import Logout from '../features/authentication/Logout';

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
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
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
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
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
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            My results
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/songs"
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
            to="/office-of-the-readings/684929a313a538c92d5f3312"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            Office of the Readings
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            onClick={handleNavLinkClick}
            to="/admin-user"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <FaRegUser size={28} />
            <span>User Settings</span>
          </NavLink>
        </li>

        <li className="relative mt-28 w-full">
          <Logout />
        </li>
      </ul>
    </nav>
  );
}

export default MobileNav;
