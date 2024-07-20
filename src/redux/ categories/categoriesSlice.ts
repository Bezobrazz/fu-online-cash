import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";

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
  selectors: {
    selectCategories: (state) => state.categories,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories } = categoriesSlice.selectors;
