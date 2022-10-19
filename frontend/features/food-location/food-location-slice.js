import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foodLocation: [],
  status: "idle",
  error: "",
};

const foodLocationSlice = createSlice({
  name: "foodLocation",
  initialState,
  reducers: {
    addFoodLocation(state, action) {
      foodLocationSlice = action.payload;
    },
  },
});

export const { addFoodLocation } = foodLocationSlice.actions;

export default foodLocationSlice.reducer;
