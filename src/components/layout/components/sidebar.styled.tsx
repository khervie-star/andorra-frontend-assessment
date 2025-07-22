import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import type { IAppTheme } from "../../../styles/app-theme";

interface NavLinkProps {
  active: boolean;
  theme: IAppTheme;
}

export const SidebarContainer = styled.div<{ theme: IAppTheme }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  height: 100vh;
  min-height: 100vh;
  padding: 2.5rem 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  font-family: "Outfit", sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

export const Logo = styled.div<{ theme: IAppTheme }>`
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 4rem;
  padding-bottom: 2.5rem;
  padding-inline-start: 0;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavLink = styled(Link)<NavLinkProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.5rem 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;

  ${({ active, theme }) =>
    active
      ? css`
          background-color: ${theme.mode === "light"
            ? "#ffffff"
            : theme.colors.card};
          color: ${theme.mode === "light" ? "#000000" : theme.colors.text};
          font-weight: 600;
          border-radius: 12px;
          box-shadow: none;
        `
      : css`
          color: ${theme.colors.onPrimary};
          font-weight: 400;
          &:hover {
            background-color: ${theme.colors.secondary}29;
            color: ${theme.colors.text};
          }
        `}

  @media (min-width: 768px) {
    padding: 1rem 0.75rem 1rem 2rem;
    font-size: 1.2rem;
  }
`;

export const LinkContent = styled.div`
  display: inline-flex;
  gap: 1rem;
  align-items: center;
`;

export const IconWrapper = styled.div`
  font-size: 1.25rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const Illustration = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
`;
