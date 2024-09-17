function ModalOverlay({ children }) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-backdropColor backdrop-blur-sm transition-all duration-500">
      {children}
    </div>
  );
}

export default ModalOverlay;
