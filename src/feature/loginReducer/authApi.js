import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { logoutDetails } from "./loginReducer";

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
  //console.log(result);
  // if (result?.error?.status === 401) {
  //   console.log("sending refresh token");
  //   const token = api.getState().ecommerceadmin.token;
  //   console.log(token);
  //   const refreshResult = await baseQuery(
  //     `api/users/${token}`,
  //     api,
  //     extraOptions
  //   );
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;

  //     api.dispatch(logoutDetails({ ...refreshResult.data, user }));

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
