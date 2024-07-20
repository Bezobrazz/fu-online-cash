import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCollectionData } from "../../firebase/firebaseService";
import { Category } from "../../types";

export const getCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>("categories/getCategories", async (_, { rejectWithValue }) => {
  try {
    const data = await getCollectionData<Category>("categories");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
