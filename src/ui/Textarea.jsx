function Textarea({ register, ...props }) {
  return (
    <textarea
      {...register} // Spread the register object here
      {...props}
      className="w-full rounded-sm border border-grey bg-lightGrey px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-yellow"
    />
  );
}

export default Textarea;
