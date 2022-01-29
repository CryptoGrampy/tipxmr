import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6600",
    },
    secondary: {
      main: "#4C4C4C",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
