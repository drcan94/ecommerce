import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartSliceState = {
  cartItems: [];
  cartTotal: number;
};

const initialState: CartSliceState = {
  cartItems: [],
  cartTotal: 0,
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addCart: create.reducer((state) => {
      state.cartTotal += 1;
    }),
  }),
});

export const { addCart } = cartSlice.actions;
