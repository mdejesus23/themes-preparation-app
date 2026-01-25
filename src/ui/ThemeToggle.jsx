import { HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ isMobile = false }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${
        isMobile
          ? 'rounded-lg bg-grey p-2 text-white hover:bg-lightYellow hover:text-dark'
          : 'rounded-lg bg-grey p-2 text-white transition-colors hover:bg-lightYellow hover:text-dark'
      }`}
      aria-label="Toggle theme"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
    </button>
  );
}

export default ThemeToggle;
