import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ecommerceLoginApi = createApi({
  reducerPath: "couponEnginesLoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/",
  }),
  tagTypes: ["Auth", "GetMenus"],
  endpoints: (builder) => ({
    addlogin: builder.mutation({
      query: (patch) => ({
        url: "/api/users/login",
        method: "POST",
        body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      providesTags: ["Auth"],
    }),
  }),
});
export const { useAddloginMutation } = ecommerceLoginApi;
