import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const initialState = {
  foodNearMe: [],
  isLoading: false,
  error: "",
};

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000",
//   }),
//   endpoints: (builder) => ({
//     getFoodNearMe: builder.query({
//       query: (location) => ({
//         url: "/food",
//         method: "POST",
//         body: location,
//       }),
//     }),
//   }),
// });

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

// export const { useGetFoodNearMeQuery } = apiSlice;

export default foodLocationSlice.reducer;
