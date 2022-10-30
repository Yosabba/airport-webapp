import { Provider } from "react-redux";
import { store } from "../store.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  mobile: "320px",
  tablet: "481px",
  laptop: "769px",
  desktop: "1024px",
  "2xl": "1201px",
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
