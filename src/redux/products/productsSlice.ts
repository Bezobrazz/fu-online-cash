import { createSlice } from "@reduxjs/toolkit";

import { addProduct, editProduct, getProducts } from "./productsOperations";
import type { Product } from "../../types";

interface ProductsSlice {
  products: Product[];
}

const initialState: ProductsSlice = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        const index = state.products.findIndex(
          (product) => product.id === payload.id
        );
        state.products[index] = payload;
      });
  },
  selectors: {
    selectProducts: (state) => state.products,
  },
});

export const productsReducer = productsSlice.reducer;
export const { selectProducts } = productsSlice.selectors;
