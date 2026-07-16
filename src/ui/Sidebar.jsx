import MainNav from './MainNav';
import Logo from './Logo';
import UserMenu from './UserMenu';

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[4.5rem] shrink-0 flex-col border-r border-borderColor bg-headerBg md:flex lg:w-72">
      <div className="flex items-center border-b border-borderColor px-5 py-4 md:justify-center md:px-0 lg:justify-start lg:px-5">
        <Logo hideTextOnTablet />
      </div>

      <MainNav />

      {/* <div className="border-t border-borderColor p-3">
        <div className="hidden lg:block">
          <UserMenu variant="card" />
        </div>
        <div className="flex justify-center lg:hidden">
          <UserMenu variant="avatar" placement="up" />
        </div>
      </div> */}
    </aside>
  );
}

export default Sidebar;
