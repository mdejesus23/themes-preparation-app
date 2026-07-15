import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Light-only design. This provider is kept as a passthrough so existing
// imports (App.jsx, useTheme consumers) keep working without dark mode.
export function ThemeProvider({ children }) {
  useEffect(() => {
    // Ensure any previously-persisted dark class is cleared.
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
