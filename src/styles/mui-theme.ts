import { createTheme } from '@mui/material/styles';

const lightModePrimaryColor = "#6366f1";
const darkModePrimaryColor = "#818cf8";

export const muiLightTheme = createTheme({
  typography: {
    fontFamily: ["Outfit", "sans-serif"].join(","),
  },

  palette: {
    primary: {
      main: lightModePrimaryColor,
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#8b5cf6",
    },

    error: {
      light: "#FA7777",
      main: "#F71C1C",
      dark: "#d31717",
    },
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",

            "&::-webkit-input-placeholder": {
              fontSize: "0.875rem !important",
            },
          },

          "& .MuiInputBase-adornedStart": {
            "& .MuiInputBase-input": {
              paddingLeft: 0,
            },
          },

          "& .radio_label": {
            gap: "0.5rem",
            color: "#4C4D52",

            "& .MuiRadio-root": {
              padding: "0 !important",
              marginLeft: "0 !important",

              "& .MuiSvgIcon-root": {
                fill: "#ADAEB3",
              },
            },

            "& .MuiRadio-root.Mui-checked": {
              "& .MuiSvgIcon-root": {
                fill: lightModePrimaryColor,
              },
            },
          },

          "& .MuiFormHelperText-root": {
            marginLeft: "0",
          },
        },
      },
    },
  },
});

export const muiDarkTheme = createTheme({
  typography: {
    fontFamily: ["Outfit", "sans-serif"].join(","),
  },

  palette: {
    primary: {
      main: darkModePrimaryColor,
      contrastText: "#000000",
    },

    secondary: {
      main: "#000000",
    },

    error: {
      light: "#FA7777",
      main: "#F71C1C",
      dark: "#d31717",
    },
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",

            "&::-webkit-input-placeholder": {
              fontSize: "0.875rem !important",
            },
          },

          "& .MuiInputBase-adornedStart": {
            "& .MuiInputBase-input": {
              paddingLeft: 0,
            },
          },

          "& .radio_label": {
            gap: "0.5rem",
            color: "#4C4D52",

            "& .MuiRadio-root": {
              padding: "0 !important",
              marginLeft: "0 !important",

              "& .MuiSvgIcon-root": {
                fill: "#ADAEB3",
              },
            },

            "& .MuiRadio-root.Mui-checked": {
              "& .MuiSvgIcon-root": {
                fill: darkModePrimaryColor,
              },
            },
          },

          "& .MuiFormHelperText-root": {
            marginLeft: "0",
          },
        },
      },
    },
  },
});
