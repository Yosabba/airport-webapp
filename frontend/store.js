import { configureStore } from "@reduxjs/toolkit";
import foodLocationReducer from "./features/food-location/food-location-slice";

export const store = configureStore({
  reducer: {
    foodLocation: foodLocationReducer,
  },
});
