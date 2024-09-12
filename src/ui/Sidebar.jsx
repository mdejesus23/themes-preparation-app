import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-full w-52 bg-dark md:block lg:w-72">
      <div className="flex w-full items-center justify-center gap-x-4 bg-grey p-4">
        <img className="w-14 lg:w-16" src="/bibleLogo.png" alt="logo" />
        <span className="font-headfont text-xl font-semibold text-white lg:text-2xl">
          Prep App
        </span>
      </div>
      <MainNav />
    </aside>
  );
}

export default Sidebar;
