function FormRow({ label, error, children, name }) {
  return (
    <div className="relative mb-6 w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-bodyFont mb-2 block text-sm font-medium text-textPrimary"
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
