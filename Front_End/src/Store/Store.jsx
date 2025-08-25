import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../CartSlice/CartSlice.jsx";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
