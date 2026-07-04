import { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const getInitialTheme = () => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark') return saved;
    // Luxury dark theme is the brand default
    return 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage may be unavailable (private mode / quota exceeded)
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
