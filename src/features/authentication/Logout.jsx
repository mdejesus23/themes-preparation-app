import { NavLink } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import Loader from '../../ui/Loader';
import { useLogoutUser } from './useUserLogout';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function Logout() {
  const { isLoggingOut, logoutUser } = useLogoutUser();
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  if (isLoggingOut) return <Loader />;

  const handleLogout = async (e) => {
    await logoutUser();
    clearUser();
    navigate('/login');
  };

  return (
    <li className="w-full">
      <NavLink
        // to="/logout"
        className="absolute bottom-0 flex w-full justify-center gap-x-2 px-2 py-5 text-lg hover:bg-yellow"
        onClick={handleLogout}
      >
        <MdLogout size={32} />
        <span>Logout</span>
      </NavLink>
    </li>
  );
}

export default Logout;
