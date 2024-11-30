import type { Action, ThunkAction, Middleware } from "@reduxjs/toolkit";
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

const rootReducer = combineSlices(counterSlice, quotesApiSlice, cartSlice);

const persistConfig = {
  key: "root",
  storage,
  transforms: [counterTransform],
  whitelist: ["cart", "counter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([quotesApiSlice.middleware as Middleware]),
    devTools: process.env.NODE_ENV !== "production",
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(/* ...other enhancers */),
  });
};

export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action<string>
>;
