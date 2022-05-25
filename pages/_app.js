import "../styles/globals.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#081230",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
