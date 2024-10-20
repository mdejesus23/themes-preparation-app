function Separator({ children }) {
  return (
    <div className="my-4 flex items-center justify-center">
      <div className="border-gray-300 w-full border-t"></div>
      <span className="text-gray-500 px-4">{children}</span>
      <div className="border-gray-300 w-full border-t"></div>
    </div>
  );
}

export default Separator;
