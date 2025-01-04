import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';
import MobileNav from './MobileNav';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-dark px-4 py-2 text-white md:hidden">
        <NavLink to="/themes">
          <img className="w-16" src="/bibleLogo.png" alt="logo" />
        </NavLink>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <HiXMark size={34} /> : <HiBars3 size={34} />}
        </button>
      </header>
      {isOpen && <MobileNav setIsOpen={setIsOpen} />}
    </>
  );
}

export default Header;
