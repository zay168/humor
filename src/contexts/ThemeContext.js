import { createContext, useContext } from 'react';
import { THEMES } from '../theme/colors';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const useThemeColors = () => {
  const { theme } = useTheme();
  return THEMES[theme] ?? THEMES.dark;
};
