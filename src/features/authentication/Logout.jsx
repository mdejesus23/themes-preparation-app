import { MdLogout } from 'react-icons/md';
import Loader from '../../ui/Loader';
import { useLogoutUser } from './useUserLogout';

function Logout() {
  const { isLoggingOut, logoutUser } = useLogoutUser();

  if (isLoggingOut) return <Loader />;

  return (
    <li className="absolute bottom-0 flex w-full items-center justify-center gap-x-4 px-2 py-5 md:bottom-auto md:right-0 md:top-0 md:w-auto lg:right-10">
      <button
        className="flex items-center gap-x-2 text-lg hover:text-yellow"
        onClick={logoutUser}
      >
        <MdLogout size={26} />
        <span className="inline md:hidden">Logout</span>
      </button>
    </li>
  );
}

export default Logout;
