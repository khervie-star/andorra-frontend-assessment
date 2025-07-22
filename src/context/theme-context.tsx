import React, { createContext, useContext, useEffect, useState } from 'react';

interface IThemeContextType {
  darkMode: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<IThemeContextType>({
  darkMode: false,
  toggle: () => {},
});

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggle: () => setDarkMode((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
