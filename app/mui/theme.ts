import { createTheme, colors } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#638EFF",
      dark: "#496CC6",
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
