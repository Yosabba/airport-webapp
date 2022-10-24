import { Provider } from "react-redux";
import { store } from "../store.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  mobile: "320px",
  tablet: "768px",
  laptop: "960px",
  desktop: "1200px",
  "2xl": "1536px",
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
