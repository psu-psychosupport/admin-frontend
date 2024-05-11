import { createTheme, colors } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#496CC6",
      dark: "#303044",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#638EFF",
    },
    error: {
      main: colors.red.A400,
    },
  },
});

export default theme;
