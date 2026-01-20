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
      'w-full rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    secondary:
      'flex items-center gap-2 rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    tertiary:
      'text-center w-full rounded-xl border-2 border border-borderColor px-4 py-2 font-semibold text-textPrimary transition-colors duration-300 hover:bg-grey hover:text-white',
    close: 'underline-offset-1 absolute top-2 right-2 text-2xl text-textPrimary',
    categorySelector: `text-sm xl:text-lg h-12 w-full p-1 md:p-3 text-center hover:bg-yellow hover:text-dark ${active ? 'bg-yellow text-dark' : 'text-textPrimary'}`,
    danger: 'bg-red-600 text-white rounded-md py-2 px-3 hover:bg-red-700',
    cancel: 'bg-bgSecondary border border-borderColor text-textPrimary rounded-md py-2 px-3 hover:bg-bgPrimary',
    link: 'flex w-full items-center gap-4 border-none bg-none p-3 text-left text-lg text-sm font-semibold text-textPrimary underline transition-all hover:bg-bgSecondary',
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
