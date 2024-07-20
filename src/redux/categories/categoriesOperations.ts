import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteDocumentById,
  getCollectionData,
} from "../../firebase/firebaseService";
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

export const deleteCategoryById = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categopries/deleteCategories", async (id, { rejectWithValue }) => {
  try {
    await deleteDocumentById("categories", id);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
