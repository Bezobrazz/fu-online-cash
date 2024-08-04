import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseProduct, Product } from "../../types";
import {
  addDocumentToCollection,
  getCollectionData,
} from "../../firebase/firebaseService";

export const getProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await getCollectionData<Product>("products");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const addProducts = createAsyncThunk<
  Product,
  BaseProduct,
  { rejectValue: string }
>("products/addProduct", async (category, { rejectWithValue }) => {
  try {
    const newProduct = await addDocumentToCollection("products", category);
    return newProduct;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
