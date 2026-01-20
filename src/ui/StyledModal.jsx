function StyledModal({ children, reference }) {
  return (
    <div
      className="styled-modal relative max-h-[90%] w-[90%] overflow-y-scroll rounded-lg bg-bgPrimary p-2 px-4 py-8 text-textPrimary shadow-lg transition-all duration-500 md:w-[60%] lg:w-[45%] xl:w-[40%]"
      ref={reference}
    >
      {children}
    </div>
  );
}

export default StyledModal;
