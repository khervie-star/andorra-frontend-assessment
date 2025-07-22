import styled from 'styled-components';

import { AppBar as MuiAppBar, Box, TextField, Toolbar as MuiToolbar } from '@mui/material';

const DRAWER_WIDTH = 280;

interface DarkModeProps {
  $darkMode: boolean;
}

export const AppContainer = styled.div`
  display: flex;
`;

export const AppBar = styled(MuiAppBar)<{ theme: any }>`
  box-shadow: none !important;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#e0e0e0"};
  background-color: ${({ theme }) => theme.colors.background || "#fff"};
  margin-left: ${DRAWER_WIDTH}px;
  width: calc(100% - ${DRAWER_WIDTH}px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem !important;
  background-color: ${({ theme }) => theme.colors.background};
  @media (min-width: 768px) {
    width: calc(100% - ${DRAWER_WIDTH}px);
    margin-left: ${DRAWER_WIDTH}px;
  }
`;

export const DrawerPaperStyles = {
  boxSizing: "border-box",
  width: DRAWER_WIDTH,
  borderRight: "0px solid transparent !important",
};

export const Main = styled.main<DarkModeProps>`
  flex-grow: 1;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.background : "#ffffff"};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  padding-top: 5.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;

  @media (min-width: 1024px) {
    padding: 1rem 2.5rem;
    padding-top: 5.5rem;
  }
`;

export const SearchBar = styled(TextField)`
  width: 300px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileLogo = styled.p`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.iconColor} !important;
  background-color: ${({ theme }) => theme.colors.iconBackground} !important;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.iconHover || "#f5f5f5"} + " !important;
  }
`;
