type TThemeMode = "light" | "dark";

interface IColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  danger: string;
  warning: string;
  success: string;
  background: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  surface: string;
  onPrimary: string;
  onBackground: string;
  iconColor: string;
  iconBackground: string;
  iconHover: string;
  iconActive: string;
  notificationBadge: string;
}

interface IAppTheme {
  mode: TThemeMode;
  colors: IColorPalette;
}

const lightTheme: IAppTheme = {
  mode: "light",
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    background: "#fafbfc",
    card: "#ffffff",
    surface: "#f1f5f9",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    onPrimary: "#ffffff",
    onBackground: "#0f172a",
    iconColor: "#4b5563",
    iconBackground: "transparent",
    iconHover: "#f1f5f9",
    iconActive: "#e2e8f0",
    notificationBadge: "#ef4444",
  },
};

const darkTheme: IAppTheme = {
  mode: "dark",
  colors: {
    primary: "#818cf8",
    secondary: "#a78bfa",
    accent: "#22d3ee",
    danger: "#f87171",
    warning: "#fbbf24",
    success: "#34d399",
    background: "#0f172a",
    card: "#1e293b",
    surface: "#334155",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "#475569",
    onPrimary: "#0f172a",
    onBackground: "#f8fafc",
    iconColor: "#94a3b8",
    iconBackground: "transparent",
    iconHover: "#1e293b",
    iconActive: "#334155",
    notificationBadge: "#f87171",
  },
};

export { lightTheme, darkTheme };
export type { IAppTheme, TThemeMode, IColorPalette };
