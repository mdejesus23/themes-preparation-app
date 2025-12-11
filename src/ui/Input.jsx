function Input({ register, ...props }) {
  return (
    <input
      {...register} // Spread the register object here
      {...props}
      className="w-full rounded-sm border border-borderColor bg-bgPrimary px-4 py-2 text-textPrimary placeholder:text-textSecondary focus:outline-none focus:ring-2 focus:ring-yellow"
    />
  );
}

export default Input;
