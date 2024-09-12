function Form({ onSubmit, children, type }) {
  return (
    <form className="mx-auto my-14 w-[95%] rounded-lg border border-lightGrey bg-white p-6 shadow-lg sm:w-4/5 md:w-2/4 lg:w-[30%] xl:w-[28%]">
      {children}
    </form>
  );
}

export default Form;
