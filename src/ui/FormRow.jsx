function FormRow({ label, error, children, name }) {
  return (
    <div className="relative mb-6 w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-bodyfont mb-2 block text-textPrimary"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default FormRow;
