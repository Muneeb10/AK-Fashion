import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if exists
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        img,
        title,
        price,
        newPrice,
        selectedColor,
        selectedSize,
        selectedDressSize,
        quantity,
      } = action.payload;

      const existingItem = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        state.cartItems.push({
          id,
          img,
          title,
          price: newPrice || price,
          quantity: quantity || 1,
          selectedColor,
          selectedSize,
          selectedDressSize,
          prevPrice: action.payload.prevPrice || null,
          reviews: action.payload.reviews || 0,
        });
      }

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            (item.selectedSize === selectedSize ||
              item.selectedDressSize === selectedDressSize)
          )
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      const item = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );
      if (item) item.quantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, selectedDressSize } =
        action.payload;
      const item = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          (item.selectedSize === selectedSize ||
            item.selectedDressSize === selectedDressSize)
      );
      if (item && item.quantity > 1) item.quantity -= 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
