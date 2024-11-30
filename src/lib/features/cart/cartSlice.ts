import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartSliceState = {
  cartItems: object[];
};

const initialState: CartSliceState = {
  cartItems: [],
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addCart: create.reducer((state, action: PayloadAction<object>) => {
      state.cartItems.push(action.payload);
    }),
  }),
  selectors: {
    selectCartTotal: (cart) => cart.cartItems.length,
  },
});

export const { addCart } = cartSlice.actions;
export const { selectCartTotal } = cartSlice.selectors;
