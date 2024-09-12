function Main({ type, children }) {
  const styles = {
    primary:
      'my-12 ml-0 flex min-h-screen flex-col items-center md:ml-52 lg:ml-72',
    secondary: '',
  };
  return <main className={styles[type]}>{children}</main>;
}

export default Main;
