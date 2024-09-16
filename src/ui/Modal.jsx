import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import Button from '../ui/Button';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-backdropColor backdrop-blur-sm transition-all duration-500">
      <div
        className="relative w-[90%] rounded-lg bg-white p-2 shadow-lg transition-all duration-500 md:w-[60%] lg:w-[45%] xl:w-[40%]"
        ref={ref}
      >
        <Button type="cancel" onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
