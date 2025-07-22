import { FileSliders, FolderKanban, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import sidebarIllustration from '../../../assets/sidebar-illustration.svg';
import {
    IconWrapper, Illustration, LinkContent, Logo, NavItem, NavLink, NavList, SidebarContainer
} from './sidebar.styled';

import type { IAppTheme } from "../../../styles/app-theme";
interface INavProps {
  name: string;
  path: string;
  icon: React.ElementType;
}

export const navRoutes: INavProps[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: FileSliders,
  },
  {
    name: "Manage",
    path: "#",
    icon: FolderKanban,
  },
  {
    name: "Settings",
    path: "#",
    icon: Settings,
  },
  {
    name: "Logout",
    path: "#",
    icon: LogOut,
  },
];

interface SidebarProps {
  closeSidebar: () => void;
  theme: IAppTheme;
}

export const Sidebar = ({ closeSidebar, theme }: SidebarProps) => {
  const location = useLocation();

  const handleLogout = () => {
    toast.info("Logged out successfully!");
  };

  return (
    <SidebarContainer theme={theme}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Logo theme={theme}>Taskr.</Logo>
      </Link>
      <div>
        <div>
          <NavList>
            {navRoutes.map((item: INavProps, index: number) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/"
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

              return (
                <NavItem key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      item.name === "Logout" && handleLogout();
                      closeSidebar();
                    }}
                    active={isActive}
                    theme={theme}>
                    <LinkContent>
                      {Icon && (
                        <IconWrapper>
                          <Icon />
                        </IconWrapper>
                      )}
                      {item.name}
                    </LinkContent>
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </div>
      </div>
      <Illustration src={sidebarIllustration} alt="Sidebar illustration" />
    </SidebarContainer>
  );
};
