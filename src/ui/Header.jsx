import { HiOutlineBell } from 'react-icons/hi2';
import useUserStore from '../store/useUserStore';
import Logo from './Logo';
import UserMenu from './UserMenu';

function Header() {
  const user = useUserStore((state) => state.user);
  const firstName = (user?.username || 'friend').split(' ')[0];

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-borderColor bg-headerBg px-4 py-3.5 md:px-8">
      {/* Mobile: logo. Desktop: greeting. */}
      <div className="flex items-center">
        <div className="md:hidden">
          <Logo compact />
        </div>
        <div className="hidden md:block">
          <h2 className="font-headfont text-base font-semibold text-textPrimary">
            Shalom, {firstName}!
          </h2>
          <p className="text-sm text-textSecondary">
            Prepare well, celebrate better.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-full p-2 text-textSecondary transition-colors hover:bg-bgSecondary hover:text-textPrimary"
          aria-label="Notifications"
        >
          <HiOutlineBell size={20} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <UserMenu variant="avatar" />
      </div>
    </header>
  );
}

export default Header;
