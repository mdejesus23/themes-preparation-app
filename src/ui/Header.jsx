import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-headerBg text-headerText flex items-center justify-between px-4 py-2 md:hidden">
        <NavLink to="/themes">
          <img className="w-16" src="/bibleLogo.png" alt="logo" />
        </NavLink>
        <div className="flex items-center gap-3">
          <ThemeToggle isMobile={true} />
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <HiXMark size={34} /> : <HiBars3 size={34} />}
          </button>
        </div>
      </header>
      {isOpen && <MobileNav setIsOpen={setIsOpen} />}
    </>
  );
}

export default Header;
