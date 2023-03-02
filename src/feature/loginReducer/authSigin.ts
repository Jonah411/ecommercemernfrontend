import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ecommerceRegisterApi = createApi({
  reducerPath: "couponEnginesLoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    authRegister: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: "/api/users/register",
          method: "POST",
          body: data,
        };
      },
    }),
    addCategories: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: "/api/categories/add",
          method: "POST",
          body: data,
        };
      },
    }),
    addproduct: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: "/api/product/add",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
export const {
  useAuthRegisterMutation,
  useAddCategoriesMutation,
  useAddproductMutation,
} = ecommerceRegisterApi;
