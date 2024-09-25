function Separator({ children }) {
  return (
    <div class="my-4 flex items-center justify-center">
      <div class="border-gray-300 w-full border-t"></div>
      <span class="text-gray-500 px-4">{children}</span>
      <div class="border-gray-300 w-full border-t"></div>
    </div>
  );
}

export default Separator;
