import { MdLogout } from 'react-icons/md';
import Loader from '../../ui/Loader';
import { useLogoutUser } from './useUserLogout';

function Logout() {
  const { isLoggingOut, logoutUser } = useLogoutUser();

  if (isLoggingOut) return <Loader />;

  return (
    <li className="w-full">
      <button
        className="absolute bottom-0 flex w-full justify-center gap-x-2 px-2 py-5 text-lg hover:bg-yellow"
        onClick={logoutUser}
      >
        <MdLogout size={32} />
        <span>Logout</span>
      </button>
    </li>
  );
}

export default Logout;
