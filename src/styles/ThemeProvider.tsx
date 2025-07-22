import * as React from 'react';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeMode } from '../context';
import { muiDarkTheme, muiLightTheme } from './mui-theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { darkMode } = useThemeMode();

  const theme = darkMode ? muiDarkTheme : muiLightTheme;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
