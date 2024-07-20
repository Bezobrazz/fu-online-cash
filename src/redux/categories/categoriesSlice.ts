import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import { getCategories } from "./categoriesOperations";

interface CategoriesSlice {
  categories: Category[];
}

const initialState: CategoriesSlice = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
  selectors: {
    selectCategories: (state) => state.categories,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories } = categoriesSlice.selectors;
