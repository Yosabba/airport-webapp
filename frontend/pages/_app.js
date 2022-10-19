import { Provider } from "react-redux";
import { store } from "../store.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const customTheme = {
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#F5f5f5",
      },
    },
  },
};

const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
