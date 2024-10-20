function Form({ onSubmit, children, type }) {
  const styles = {
    primary:
      'mx-auto my-14 w-[95%] max-w-[500px] rounded-lg border border-lightGrey bg-white p-6 shadow-lg sm:w-4/5 md:w-2/4 lg:w-[30%] xl:w-[80%]',
    secondary:
      'mx-auto my-14 w-[95%] rounded-lg border border-lightGrey bg-white p-6 shadow-lg sm:w-4/5 md:w-[70%] lg:w-[50%] xl:w-[40%]',
    tertiary:
      'mx-auto my-14 w-[95%] bg-white p-2 md:p-6 sm:w-4/5 md:w-[70%] lg:w-[65%] xl:w-[70%]',
  };
  return (
    <form onSubmit={onSubmit} className={styles[type]}>
      {children}
    </form>
  );
}

export default Form;
