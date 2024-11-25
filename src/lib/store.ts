import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { counterSlice } from "./features/counter/counterSlice";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import storage from "redux-persist/lib/storage";
import { counterTransform } from "./persistTransforms"; // Transform'u içe aktar
import { PersistPartial } from "redux-persist/lib/persistReducer";
import { cartSlice } from "./features/cart/cartSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(counterSlice, quotesApiSlice, cartSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer> & PersistPartial;

const persistConfig = {
  key: "root",
  storage,
  transforms: [counterTransform],
};

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).concat([quotesApiSlice.middleware]) as any,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(/* ...other enhancers */),
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action<string>
>;
