function StyledModal({ children, reference }) {
  return (
    <div
      className="relative w-[90%] rounded-lg bg-white p-2 shadow-lg transition-all duration-500 md:w-[60%] lg:w-[45%] xl:w-[40%]"
      ref={reference}
    >
      {children}
    </div>
  );
}

export default StyledModal;
