function Main({ type, children }) {
  const styles = {
    primary:
      'flex-1 px-2 lg:px-12 py-8 lg:py-12 min-h-screen w-full flex flex-col items-center',
    secondary: '',
  };
  return <main className={styles[type]}>{children}</main>;
}

export default Main;
