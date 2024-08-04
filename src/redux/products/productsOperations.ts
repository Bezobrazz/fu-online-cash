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

export const addProduct = createAsyncThunk<
  Product,
  BaseProduct,
  { rejectValue: string }
>("products/addProduct", async (product, { rejectWithValue }) => {
  try {
    const newProduct = await addDocumentToCollection("products", product);
    return newProduct;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
