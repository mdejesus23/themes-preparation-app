import { Link } from 'react-router-dom';

function Button({
  children,
  disabled,
  to,
  type = 'button',
  design,
  onClick,
  className,
  active,
}) {
  const styles = {
    primary:
      'w-full rounded-lg border-none bg-green px-4 py-2.5 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-lightGreen disabled:opacity-60',
    secondary:
      'flex items-center justify-center gap-2 rounded-lg border-none bg-green px-4 py-2.5 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-lightGreen disabled:opacity-60',
    dark: 'flex w-full items-center justify-center gap-2 rounded-lg border-none bg-dark px-4 py-2.5 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-black',
    tertiary:
      'text-center w-full rounded-lg border border-borderColor bg-bgPrimary px-4 py-2.5 font-semibold text-textPrimary transition-colors duration-200 hover:bg-bgSecondary',
    outline:
      'flex items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-2.5 font-semibold text-textPrimary transition-colors duration-200 hover:bg-bgSecondary',
    close:
      'underline-offset-1 absolute top-2 right-2 text-2xl text-textSecondary hover:text-textPrimary',
    categorySelector: `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? 'bg-green text-white' : 'text-textSecondary hover:bg-sidebarActive hover:text-sidebarActiveText'}`,
    danger:
      'flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-red-700',
    cancel:
      'rounded-lg border border-borderColor bg-bgPrimary px-3 py-2 font-semibold text-textPrimary transition-colors hover:bg-bgSecondary',
    link: 'flex w-full items-center gap-2 border-none bg-none p-3 text-left text-sm font-semibold text-green underline transition-all hover:text-lightGreen',
    link2:
      'flex w-full items-center gap-4 border-none bg-none p-3 text-left text-sm text-textPrimary transition-all hover:bg-bgSecondary',
  };

  if (to)
    return (
      <Link to={to} className={styles[design]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={styles[design] || className}
      >
        {children}
      </button>
    );

  if (className) {
    return (
      <button type={type} disabled={disabled} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} disabled={disabled} className={styles[design]}>
      {children}
    </button>
  );
}

export default Button;
