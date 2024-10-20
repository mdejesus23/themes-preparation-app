import { Link } from 'react-router-dom';

function Button({
  children,
  disabled,
  to,
  type = 'button',
  style,
  onClick,
  className,
  active,
}) {
  const styles = {
    primary:
      'w-full rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    secondary:
      'mt-2  rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    tertiary:
      'text-center w-full rounded-xl border-2 border px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-grey hover:text-white',
    close: 'underline-offset-1 absolute top-2 right-2 text-2xl',
    categorySelector: `text-sm xl:text-lg h-12 w-full p-1 md:p-3 text-center hover:bg-yellow hover:text-dark ${active ? 'bg-yellow text-dark' : ''}`,
    danger: 'bg-red text-white rounded-md py-2 px-3 hover:text-dark',
    cancel: 'bg-lightGrey border border-grey rounded-md py-2 px-3',
    link: 'hover:bg-gray-50 flex w-full items-center gap-4 border-none bg-none p-3 text-left text-lg text-sm font-semibold underline transition-all',
  };

  if (to)
    return (
      <Link to={to} className={styles[style]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[style]}>
        {children}
      </button>
    );

  if (className) {
    return (
      <button disabled={disabled} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[style]}>
      {children}
    </button>
  );
}

export default Button;
