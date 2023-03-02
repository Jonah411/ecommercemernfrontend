import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginlist: null,
  user: null,
  token: null,
  searchProduct: null,
  priceProduct: null,
  addCart: [],
  checkOut: null,
};

const ecommerceadmin = createSlice({
  name: "ecommerceadmin",
  initialState,
  reducers: {
    authloginDetails: (state, { payload }) => {
      state.token = payload?.token;
      state.loginlist = payload?.userName.user;
      state.user = payload?.userName;
      //state.token = payload;
    },
    logoutDetails: (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.loginlist = null;
    },
    searchProductDetails: (state, { payload }) => {
      state.searchProduct = payload;
    },
    priceProductDetails: (state, { payload }) => {
      state.priceProduct = payload;
    },
    hideProductDetails: (state, { payload }) => {
      state.priceProduct = null;
    },
    addCartDetails: (state, { payload }) => {
      // Create a new array with the existing cart items plus the new item
      const newCart = [...state.addCart, payload];

      // Update the state with the new cart
      return { ...state, addCart: newCart };
    },
    checkoutDetails: (state, { payload }) => {
      state.checkOut = payload;
    },
  },
});

export const {
  authloginDetails,
  logoutDetails,
  searchProductDetails,
  priceProductDetails,
  hideProductDetails,
  addCartDetails,
  checkoutDetails,
} = ecommerceadmin.actions;
export const getLoginDetails = (state) => state?.ecommerceadmin?.loginlist;
export const getLoginDetailsUser = (state) => state?.ecommerceadmin?.user;
export const getLoginDetailsToken = (state) => state?.ecommerceadmin?.token;
export const getSearchProductDetails = (state) =>
  state?.ecommerceadmin?.searchProduct;
export const getPriceProductDetails = (state) =>
  state?.ecommerceadmin?.priceProduct;
export const getAddCartDetails = (state) => state?.ecommerceadmin?.addCart;
export const getCheckoutDetails = (state) => state?.ecommerceadmin?.checkOut;
export default ecommerceadmin.reducer;
