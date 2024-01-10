import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#bb86fc",
      light: "#e6e6e6",
      dark: "#212121",
    },
    secondary: {
      main: "#1ddecb",
      dark: "#383838",
    },
    error: {
      // main: "#ff6c00",
      main: "#b23239",
    },
  },
});
