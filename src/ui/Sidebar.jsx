import MainNav from './MainNav';
// import useUserStore from '../../store/userStore';
import ThemeToggle from './ThemeToggle';

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden min-h-screen w-52 flex-col bg-headerBg md:flex lg:w-72">
      <div className="flex w-full items-center justify-center gap-x-4 bg-headerGrey p-4">
        <img className="w-14 lg:w-16" src="/bibleLogo.png" alt="logo" />
        <span className="font-headfont text-xl font-semibold text-headerText lg:text-2xl">
          Prep App
        </span>
        <ThemeToggle />
      </div>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
