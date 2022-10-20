import { configureStore } from "@reduxjs/toolkit";
import foodLocationReducer from "./features/food-location/food-location-slice";
// import { apiSlice } from "./features/food-location/food-location-slice";

export const store = configureStore({
  reducer: {
    food: foodLocationReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(apiSlice.middleware);
  // },
});
