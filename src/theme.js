import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#364a63",
    },
  },
  typography: {
    fontFamily: ["Inter", "-apple-system", "Roboto", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    body1: {
      color: "#364a63",
    },
    body2: {
      color: "#364a63",
    },
  },
});

export default theme;
