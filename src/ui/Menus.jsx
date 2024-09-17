import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="hover:bg-gray-100 translate-x-2 rounded-md border-none bg-none p-1 transition-all"
    >
      <HiEllipsisVertical className="text-gray-700 h-6 w-6" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="fixed rounded-md bg-white shadow-md"
      style={{ right: `${position?.x}px`, top: `${position?.y}px` }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="hover:bg-gray-50 flex w-full items-center gap-4 border-none bg-none p-3 text-left text-sm transition-all"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

// Menus.Menu = ({ children }) => (
//   <div className="flex items-center justify-end">{children}</div>
// );
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
