import MainNav from './MainNav';
import ThemeToggle from './ThemeToggle';
// import useUserStore from '../../store/userStore';

function Sidebar() {
  return (
    <aside className="bg-headerBg relative bottom-0 top-0 hidden w-52 md:block lg:w-72">
      <div className="bg-headerGrey flex w-full items-center justify-center gap-x-4 p-4">
        <img className="w-14 lg:w-16" src="/bibleLogo.png" alt="logo" />
        <span className="text-headerText font-headfont text-xl font-semibold lg:text-2xl">
          Prep App
        </span>
      </div>
      <MainNav />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}

export default Sidebar;
