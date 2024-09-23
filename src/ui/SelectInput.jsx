function SelectInput({ label, options, value, onChange, id, placeholder }) {
  return (
    <select
      className="w-full rounded-sm border border-grey bg-lightGrey px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-yellow"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option className="text-dark" value="" disabled>
        {placeholder || 'Select an option'}
      </option>
      {options.map((option) => (
        <option className="text-dark" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
