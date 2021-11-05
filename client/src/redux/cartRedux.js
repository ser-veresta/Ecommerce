import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { price, quantity } = action.payload;
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += price * quantity;
    },
    removeProduct: (state, action) => {
      const { price, quantity } = state.products[action.payload];
      state.quantity -= 1;
      state.total -= price * quantity;
      state.products = state.products.filter((_, index) => index !== action.payload);
    },
    editProduct: (state, action) => {
      const { i, type } = action.payload;
      if (type === "dec") {
        if (state.products[i].quantity - 1 > 0) {
          state.products[i].quantity -= 1;
          state.total -= state.products[i].price;
        }
      } else if (type === "inc") {
        state.products[i].quantity += 1;
        state.total += state.products[i].price;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, clearCart, removeProduct, editProduct } = cartSlice.actions;

export default cartSlice.reducer;
