import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineMusicalNote,
  HiOutlineEllipsisHorizontal,
  HiXMark,
} from 'react-icons/hi2';
import MainNav from './MainNav';
import UserMenu from './UserMenu';
import Logo from './Logo';

const tabs = [
  { to: '/themes', label: 'Themes', icon: HiOutlineSquares2X2, end: true },
  { to: '/themes', label: 'Votes', icon: HiOutlineChartBar },
  { to: '/songs', label: 'Songs', icon: HiOutlineMusicalNote },
];

function MobileNav() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* Slide-up full nav drawer */}
      {moreOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-backdropColor"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-borderColor bg-headerBg pb-4">
            <div className="flex items-center justify-between border-b border-borderColor px-5 py-4">
              <Logo />
              <button
                onClick={() => setMoreOpen(false)}
                className="rounded-full p-1 text-textSecondary hover:bg-bgSecondary"
              >
                <HiXMark size={24} />
              </button>
            </div>
            <MainNav onNavigate={() => setMoreOpen(false)} />
            <div className="border-t border-borderColor px-3 pt-3">
              <UserMenu variant="card" />
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-borderColor bg-headerBg md:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.label}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.7rem] font-medium transition-colors ${
                  isActive ? 'text-green' : 'text-textSecondary'
                }`
              }
            >
              <Icon size={22} />
              {tab.label}
            </NavLink>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.7rem] font-medium text-textSecondary"
        >
          <HiOutlineEllipsisHorizontal size={22} />
          More
        </button>
      </nav>
    </>
  );
}

export default MobileNav;
