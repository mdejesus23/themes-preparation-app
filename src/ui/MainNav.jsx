import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import Logout from '../features/authentication/Logout';

function MainNav() {
  return (
    <nav>
      <ul className="flex w-full flex-col items-center text-white">
        <li className="w-full">
          <NavLink
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
            to="/office-of-readings"
            className={({ isActive }) =>
              `flex w-full justify-center px-2 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            Office of Readings
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
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

        <Logout />
      </ul>
    </nav>
  );
}

export default MainNav;
