function Main({ type, children }) {
  const styles = {
    primary:
      'flex-1 h-screen overflow-y-auto px-2 lg:px-12 py-8 lg:py-12 min-h-screen w-full flex flex-col items-center',
    secondary: '',
  };
  return (
    <main className="flex h-screen min-h-screen w-full flex-1 flex-col items-center overflow-y-auto px-2 py-8 lg:px-12 lg:py-12">
      {children}
    </main>
  );
}

export default Main;
