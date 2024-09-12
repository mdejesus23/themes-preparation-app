function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-sm border border-grey bg-lightGrey px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-yellow"
    />
  );
}

export default Input;
