import MainNav from './MainNav';
import Logo from './Logo';
import UserMenu from './UserMenu';

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-borderColor bg-headerBg md:flex lg:w-72">
      <div className="flex items-center border-b border-borderColor px-5 py-4">
        <Logo />
      </div>

      <MainNav />

      <div className="border-t border-borderColor p-3">
        <UserMenu variant="card" />
      </div>
    </aside>
  );
}

export default Sidebar;
