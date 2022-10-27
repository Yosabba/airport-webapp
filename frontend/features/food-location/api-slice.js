import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "foodDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://airport-webapp-production.up.railway.app",
  }),
  endpoints: (builder) => ({
    getFoodDetails: builder.mutation({
      query: (id) => ({
        url: `/food/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetFoodDetailsMutation } = apiSlice;
