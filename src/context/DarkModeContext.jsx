import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const userDefaultTheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

function DarkModeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(userDefaultTheme, 'theme');

  function handleTheme() {
    setTheme((theme) => !theme);
  }

  useEffect(() => {
    theme
      ? document.documentElement.classList.add('dark-mode')
      : document.documentElement.classList.remove('dark-mode');
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('Value outside of context provider!');

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
