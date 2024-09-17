import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick, className, active }) {
  const styles = {
    primary:
      'w-full rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    secondary:
      'mt-2 w-full rounded-sm border-2 border-none bg-yellow px-4 py-2 font-semibold text-dark transition-colors duration-300 hover:bg-lightYellow',
    tertiary: 'underline-offset-1',
    cancel: 'underline-offset-1 absolute top-2 right-2 text-2xl',
    categorySelector: `text-sm xl:text-lg h-12 w-full p-1 md:p-3 text-center hover:bg-yellow hover:text-dark ${active ? 'bg-yellow text-dark' : ''}`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
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
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
