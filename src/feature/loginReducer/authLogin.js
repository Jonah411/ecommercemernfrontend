import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/ConstaltsVariables";

// Define a service using a base URL and expected endpoints
export const ecommerceLoginApi = createApi({
  reducerPath: "couponEnginesLoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
