function SelectInput({ label, options, register, id, placeholder }) {
  return (
    <div>
      {label && <label htmlFor={id} className="text-textPrimary">{label}</label>}
      <select
        className="w-full rounded-sm border border-borderColor bg-bgPrimary px-4 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-yellow"
        id={id}
        {...register}
      >
        <option className="bg-bgPrimary text-textPrimary" value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options.map((option) => (
          <option className="bg-bgPrimary text-textPrimary" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
