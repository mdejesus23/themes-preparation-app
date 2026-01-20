import MainNav from './MainNav';
// import useUserStore from '../../store/userStore';

function Sidebar() {
  return (
    <aside className="bg-headerBg sticky top-0 hidden min-h-screen w-52 flex-col md:flex lg:w-72">
      <div className="bg-headerGrey flex w-full items-center justify-center gap-x-4 p-4">
        <img className="w-14 lg:w-16" src="/bibleLogo.png" alt="logo" />
        <span className="text-headerText font-headfont text-xl font-semibold lg:text-2xl">
          Prep App
        </span>
      </div>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
