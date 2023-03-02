import { combineReducers } from "redux";
import { baseLoginApi } from "./loginReducer/authApi";
import { ecommerceLoginApi } from "./loginReducer/authLogin";
import { ecommerceRegisterApi } from "./loginReducer/authSigin.ts";
import ecommerceadmin from "../feature/loginReducer/loginReducer";

const rootReducer = combineReducers({
  ecommerceadmin: ecommerceadmin,
  [baseLoginApi.reducerPath]: baseLoginApi.reducer,
  [ecommerceLoginApi.reducerPath]: ecommerceLoginApi.reducer,
  [ecommerceRegisterApi.reducerPath]: ecommerceRegisterApi.reducer,
});

export default rootReducer;
