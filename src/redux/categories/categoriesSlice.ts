import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import { deleteCategoryById, getCategories } from "./categoriesOperations";

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
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(deleteCategoryById.fulfilled, (state, { payload }) => {
        state.categories.filter((category) => category.id !== payload);
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories } = categoriesSlice.selectors;
