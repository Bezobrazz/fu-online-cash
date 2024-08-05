import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "./categoriesOperations";

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
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.categories.push(payload);
      })
      .addCase(editCategory.fulfilled, (state, { payload }) => {
        const index = state.categories.findIndex(
          (category) => category.id === payload.id
        );
        state.categories[index] = payload;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const index = state.categories.findIndex((elem) => elem.id === payload);
        if (index !== -1) {
          state.categories.splice(index, 1);
        }
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories } = categoriesSlice.selectors;
