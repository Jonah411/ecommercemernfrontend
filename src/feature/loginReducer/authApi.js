import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/ConstaltsVariables";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().ecommerceadmin.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result?.error);
  // if (result?.error?.originalStatus === 401) {
  //   console.log("sending refresh token");

  //   const refreshResult = await baseQuery("/refresh", api, extraOptions);
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;

  //     api.dispatch(loginDetails({ ...refreshResult.data, user }));

  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logoutDetails());
  //   }
  // }
  return result;
};

export const baseLoginApi = createApi({
  reducerPath: "baseLoginApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
