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
        {/* <li className="w-full">
          <NavLink
            to="/logout"
            className="absolute bottom-0 flex w-full justify-center gap-x-2 px-2 py-5 text-lg hover:bg-yellow"
          >
            <MdLogout size={32} />
            <span>Logout</span>
          </NavLink>
        </li> */}
        <Logout />
      </ul>
    </nav>
  );
}

export default MainNav;
