function Input({ register, ...props }) {
  return (
    <input
      {...register} // Spread the register object here
      {...props}
      className="w-full rounded-lg border border-borderColor bg-bgPrimary px-4 py-2.5 text-textPrimary placeholder:text-textSecondary focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
    />
  );
}

export default Input;
