import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Box, CssBaseline, Drawer, IconButton, InputAdornment, Tooltip } from '@mui/material';

import { useThemeMode } from '../../context';
import { darkTheme, lightTheme } from '../../styles';
import { Sidebar } from './components';
import {
    AppBar, AppContainer, ContentWrapper, DrawerPaperStyles, IconWrapper, Main, MobileLogo,
    SearchBar, Toolbar
} from './layout.styled';

const DRAWER_WIDTH = 280;

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
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Link to="/">
                <MobileLogo theme={currentTheme}>Taskr.</MobileLogo>
              </Link>
            </Box>

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
                  <IconButton onClick={toggle}>
                    {darkMode ? (
                      <Sun
                        size={20}
                        color={
                          darkMode
                            ? darkTheme.colors.iconColor
                            : lightTheme.colors.iconColor
                        }
                      />
                    ) : (
                      <Moon
                        size={20}
                        color={
                          darkMode
                            ? darkTheme.colors.iconColor
                            : lightTheme.colors.iconColor
                        }
                      />
                    )}
                  </IconButton>
                </IconWrapper>
              </Tooltip>

              <Tooltip title="Notifications" arrow>
                <IconWrapper theme={currentTheme}>
                  <IconButton size="small">
                    <Bell
                      size={20}
                      color={
                        darkMode
                          ? darkTheme.colors.iconColor
                          : lightTheme.colors.iconColor
                      }
                    />
                  </IconButton>
                </IconWrapper>
              </Tooltip>

              <Tooltip title="Menu" arrow>
                <IconWrapper
                  theme={currentTheme}
                  sx={{ display: { xs: "block", md: "none" } }}>
                  <IconButton onClick={handleDrawerToggle} size="small">
                    <Menu
                      size={20}
                      color={
                        darkMode
                          ? darkTheme.colors.iconColor
                          : lightTheme.colors.iconColor
                      }
                    />
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

        <Main $darkMode={darkMode}>
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </Main>
      </AppContainer>
    </>
  );
};
