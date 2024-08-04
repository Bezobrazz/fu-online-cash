import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import { addProducts, getProducts } from "./productsOperations";

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
      .addCase(addProducts.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      });
  },
  selectors: {
    selectProducts: (state) => state.products,
  },
});

export const productsReducer = productsSlice.reducer;
export const { selectProducts } = productsSlice.selectors;
