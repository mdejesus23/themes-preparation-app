function Form({ onSubmit, children, type }) {
  const styles = {
    primary:
      'mx-auto my-14 w-full max-w-[40rem] min-w-[22rem] rounded-lg border border-lightGrey bg-white p-6 shadow-lg ',
    secondary:
      'mx-auto my-14 w-full rounded-lg border border-lightGrey bg-white p-6 shadow-lg sm:w-4/5 md:w-[70%] lg:w-[50%] xl:w-[40%]',
    tertiary:
      'mx-auto my-14 w-full bg-white p-2 md:p-6 sm:w-4/5 md:w-[70%] lg:w-[65%] xl:w-[70%]',
  };
  return (
    <form onSubmit={onSubmit} className={styles[type]}>
      {children}
    </form>
  );
}

export default Form;
