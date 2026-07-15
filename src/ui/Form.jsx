function Form({ onSubmit, children, type }) {
  const styles = {
    primary:
      'mx-auto my-14 w-full max-w-[32rem] min-w-[20rem] rounded-2xl border border-borderColor bg-bgPrimary p-8 shadow-xl ',
    secondary:
      'mx-auto my-14 w-full rounded-2xl border border-borderColor bg-bgPrimary p-8 shadow-xl sm:w-4/5 md:w-[70%] lg:w-[50%] xl:w-[40%]',
    tertiary:
      'mx-auto my-14 w-full rounded-2xl border border-borderColor bg-bgPrimary p-4 shadow-xl md:p-8 sm:w-4/5 md:w-[70%] lg:w-[65%] xl:w-[70%]',
  };
  return (
    <form onSubmit={onSubmit} className={styles[type]}>
      {children}
    </form>
  );
}

export default Form;
