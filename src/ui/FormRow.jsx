function FormRow({ label, error, children, name }) {
  return (
    <div className="relative mb-6 w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-bodyfont text-projectDesc mb-2 block"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red">{error}</p>}
    </div>
  );
}

export default FormRow;
