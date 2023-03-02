import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { compose } from "redux";
import rootReducer from "./index";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { ecommerceLoginApi } from "./loginReducer/authLogin";
import { ecommerceRegisterApi } from "./loginReducer/authSigin.ts";
import { baseLoginApi } from "./loginReducer/authApi";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};
const enhancers = [];
if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      baseLoginApi.middleware,
      ecommerceLoginApi.middleware,
      ecommerceRegisterApi.middleware,
    ]),
  enhancers: composedEnhancers,
});

setupListeners(store.dispatch);
export default store;
export const persistor = persistStore(store);
