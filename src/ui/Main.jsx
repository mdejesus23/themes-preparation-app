function Main({ type, children }) {
  // "primary" = left-aligned dashboard content (inside AppLayout, next to the
  // sidebar). Anything else = centered column (public / auth shell).
  if (type === 'primary') {
    return (
      <main className="page-surface relative min-h-screen w-full flex-1 px-4 pb-24 pt-6 text-textPrimary md:px-8 md:pb-12 md:pt-8">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    );
  }

  return (
    <main className="page-surface relative flex min-h-screen w-full flex-1 flex-col items-center px-4 py-8 text-textPrimary lg:px-12 lg:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </main>
  );
}

export default Main;
