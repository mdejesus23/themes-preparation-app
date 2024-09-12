function FormRow({ label, error, children, name }) {
  return (
    <div className="mb-6 w-full">
      {label && (
        <label for={name} className="font-bodyfont text-projectDesc mb-2 block">
          {label}
        </label>
      )}
      {children}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default FormRow;
