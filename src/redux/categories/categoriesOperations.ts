import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDocumentToCollection,
  deleteDocumentById,
  getCollectionData,
  editDocumentById,
} from "../../firebase/firebaseService";
import type { Category, NewCategory } from "../../types";

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

export const addCategory = createAsyncThunk<
  Category,
  NewCategory,
  { rejectValue: string }
>("categories/addCategory", async (category, { rejectWithValue }) => {
  try {
    const newCategory = await addDocumentToCollection("categories", category);
    return newCategory;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const editCategory = createAsyncThunk<
  Category,
  { id: string; title: string },
  { rejectValue: string }
>("categories/editCategory", async ({ id, title }, { rejectWithValue }) => {
  try {
    const updatedCategory = await editDocumentById<Category>("categories", id, {
      title,
    });
    return updatedCategory;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categopries/deleteCategory", async (id, { rejectWithValue }) => {
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
