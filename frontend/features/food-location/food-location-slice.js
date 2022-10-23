import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foodNearMe: [],
  isLoading: false,
  isFetched: false,
  error: "",
};

export const fetchFoodNearMe = createAsyncThunk(
  "food/fetchFoodNearMe",
  async (location, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/food", location);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const foodLocationSlice = createSlice({
  name: "foodLocation",
  initialState,
  reducers: {
    addFoodLocation(state, action) {
      state.foodNearMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodNearMe.fulfilled, (state, action) => {
        state.foodNearMe = action.payload;
        state.isLoading = false;
        state.isFetched = true;
      })
      .addCase(fetchFoodNearMe.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFoodNearMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFoodLocation } = foodLocationSlice.actions;

export default foodLocationSlice.reducer;
