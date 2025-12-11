function Separator({ children }) {
  return (
    <div className="my-4 flex items-center justify-center">
      <div className="w-full border-t border-borderColor"></div>
      <span className="px-4 text-textSecondary">{children}</span>
      <div className="w-full border-t border-borderColor"></div>
    </div>
  );
}

export default Separator;
