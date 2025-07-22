import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import {
    AppBar as MuiAppBar, Box, CssBaseline, Drawer, IconButton, InputAdornment, TextField,
    Toolbar as MuiToolbar, Tooltip
} from '@mui/material';

import { useThemeMode } from '../../context';
import { darkTheme, lightTheme } from '../../styles';
import { Sidebar } from './components';

const DRAWER_WIDTH = 280;

const AppContainer = styled.div`
  display: flex;
`;

const AppBar = styled(MuiAppBar)<{ theme: any }>`
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

const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem !important;
  background-color: ${({ theme }) => theme.colors.background || "#fff"};
  @media (min-width: 768px) {
    width: calc(100% - ${DRAWER_WIDTH}px);
    margin-left: ${DRAWER_WIDTH}px;
  }
`;

const DrawerPaperStyles = {
  boxSizing: "border-box",
  width: DRAWER_WIDTH,
  borderRight: "0px solid transparent !important",
};

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
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

const SearchBar = styled(TextField)`
  width: 300px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileLogo = styled.p<{ theme: any }>`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.iconColor};
  background-color: ${({ theme }) =>
    theme.colors.iconBackground || "transparent"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.iconHover || "#f5f5f5"};
  }
`;

export const AppLayout = () => {
  const { darkMode, toggle } = useThemeMode();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <>
      <CssBaseline />
      <AppContainer>
        <AppBar position="fixed" theme={currentTheme}>
          <Toolbar>
            {/* Show logo only on mobile */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <MobileLogo theme={currentTheme}>Taskr.</MobileLogo>
            </Box>

            {/* Search bar - only on desktop */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <SearchBar
                placeholder="Search..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Tooltip title={darkMode ? "Light mode" : "Dark mode"} arrow>
                <IconWrapper theme={currentTheme}>
                  <IconButton onClick={toggle} size="small">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </IconButton>
                </IconWrapper>
              </Tooltip>

              <Tooltip title="Notifications" arrow>
                <IconWrapper theme={currentTheme}>
                  <IconButton size="small">
                    <Bell size={20} />
                  </IconButton>
                </IconWrapper>
              </Tooltip>

              <Tooltip title="Menu" arrow>
                <IconWrapper
                  theme={currentTheme}
                  sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton onClick={handleDrawerToggle} size="small">
                    <Menu size={20} />
                  </IconButton>
                </IconWrapper>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
          aria-label="Side menu">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerClose}
            onTransitionEnd={handleDrawerTransitionEnd}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": DrawerPaperStyles,
            }}>
            <Sidebar closeSidebar={handleDrawerClose} theme={currentTheme} />
          </Drawer>

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": DrawerPaperStyles,
            }}>
            <Sidebar closeSidebar={handleDrawerClose} theme={currentTheme} />
          </Drawer>
        </Box>

        <Main>
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </Main>
      </AppContainer>
    </>
  );
};
