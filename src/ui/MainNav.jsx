import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import Logout from '../features/authentication/Logout';
import { MdLibraryMusic } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';
import { MdListAlt } from 'react-icons/md';
import { MdFormatListBulleted } from 'react-icons/md';
import { MdLibraryBooks } from 'react-icons/md';

function MainNav() {
  return (
    <nav>
      <ul className="text-headerText flex w-full flex-col items-center">
        <li className="w-full">
          <NavLink
            to="/themes"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <MdListAlt size={28} />
            All themes
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/admin-themes"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <MdListAlt size={28} />
            My themes
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/admin-results"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <MdFormatListBulleted size={28} />
            My results
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/songs"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <MdLibraryMusic size={28} />
            Song Book
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/office-of-the-readings/684929a313a538c92d5f3312"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
                isActive ? 'text-yellow' : ''
              }`
            }
          >
            <MdMenuBook size={28} />
            Office of the Readings
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/catechism-of-the-catholic-church/68b45c9e3d17dcca0c489c85"
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
            to="/admin-user"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 px-4 py-5 text-lg hover:text-yellow ${
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
