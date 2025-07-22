import * as React from 'react';

import { CircularProgress, useTheme } from '@mui/material';

import { useThemeMode } from '../../context';
import { ButtonBox } from './button.styled';

export const AppButton: React.FC<IButtonProps> = ({
  link,
  click,
  isDisabled,
  type = "button",
  loading,
  variant = "Primary",
  children,
  extraClass,
  style,
}) => {
  const { darkMode } = useThemeMode();
  const theme = useTheme();

  const btnPrimary = {
    backgroundColor: (theme: any) => theme.palette.primary.main,
    color: darkMode ? "#000000" : "#ffffff",
    borderColor: (theme: any) => theme.palette.primary.main,

    "&:hover": {
      backgroundColor: (theme: any) => theme.palette.primary.light,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4",
      borderColor: "#C4C4C4",
    },
  };

  const btnOutline = {
    backgroundColor: "transparent",
    color:
      variant === "PrimaryOutline"
        ? (theme: any) => theme.palette.primary.main
        : (theme: any) => theme.palette.secondary.main,
    borderColor:
      variant === "PrimaryOutline"
        ? (theme: any) => theme.palette.primary.main
        : (theme: any) => theme.palette.secondary.main,
    borderWidth: "1px",

    "&:hover": {
      color: "#ffffff",
      backgroundColor:
        variant === "PrimaryOutline"
          ? (theme: any) => theme.palette.primary.main
          : (theme: any) => theme.palette.secondary.main,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4",
      borderColor: "transparent",
    },
  };

  const btnSecondary = {
    backgroundColor: "transparent",
    color: (theme: any) => theme.palette.secondary.main,
    borderColor: (theme: any) => theme.palette.secondary.main,
    borderWidth: "1px",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: (theme: any) => theme.palette.secondary.light,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4",
    },
  };

  return (
    <ButtonBox
      href={link}
      disabled={isDisabled}
      onClick={click}
      sx={
        variant === "Primary"
          ? btnPrimary
          : variant === "PrimaryOutline" || variant === "SecondaryOutline"
          ? btnOutline
          : variant === "Secondary"
          ? btnSecondary
          : undefined
      }
      style={style}
      className={extraClass}
      type={type}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {" "}
        {children}
        {loading && (
          <CircularProgress
            sx={{
              width: "21px !important",
              height: "21px !important",
              color: isDisabled
                ? theme.palette.action.disabled
                : darkMode
                ? "#000000"
                : "#ffffff",
            }}
            className="ms-2"
          />
        )}
      </div>
    </ButtonBox>
  );
};

interface IButtonProps {
  link?: string;
  click?: any;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  loading?: boolean;
  variant?: "Primary" | "PrimaryOutline" | "SecondaryOutline" | "Secondary";
  children: React.ReactNode;
  extraClass?: string;
  type?: "button" | "submit";
  style?: any;
}
