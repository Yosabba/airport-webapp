import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foodNearMe: [],
  airport: "",
  isLoading: false,
  isFetched: false,
  error: "",
};

export const fetchFoodNearMe = createAsyncThunk(
  "food/fetchFoodNearMe",
  async (location, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/food`,
        location
      );

      const uniqueFood = data.filter(
        (food, index, self) =>
          index === self.findIndex((t) => t.name === food.name)
      );
      return fulfillWithValue(uniqueFood);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleFood = createAsyncThunk(
  "food/fetchSingleFood",
  async (food, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/food/${id}`
      );
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
    addAirport(state, action) {
      state.airport = action.payload;
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

export const { addFoodLocation, addAirport } = foodLocationSlice.actions;

export default foodLocationSlice.reducer;
