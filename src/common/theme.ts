import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#a486fc",
      // #9359ff
      light: "#e6e6e6",
      dark: "#212121",
    },
    secondary: {
      main: "#1ddecb",
      // dark: "#383838",
      dark: "#313132",
    },
    error: {
      main: "#b23239",
    },
  },
});
