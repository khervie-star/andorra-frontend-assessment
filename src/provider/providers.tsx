import { Toaster } from 'sonner';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { useThemeMode } from '../context';
import { ThemeProvider } from '../styles';
import { darkTheme, lightTheme } from '../styles/app-theme';

interface IProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProps> = ({ children }) => {
  const { darkMode } = useThemeMode();
  return (
    <SCThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ThemeProvider>
        <Toaster
          richColors
          closeButton
          position="top-right"
          style={{
            fontFamily: "Outfit",
          }}
        />
        {children}
      </ThemeProvider>
    </SCThemeProvider>
  );
};
