import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addDocumentToCollection,
  editDocumentById,
  getCollectionData,
} from "../../firebase/firebaseService";
import { BaseProduct, Product } from "../../types";

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

export const editProduct = createAsyncThunk<
  Product,
  { id: string; data: BaseProduct },
  { rejectValue: string }
>("products/editProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedProduct = await editDocumentById<Product>("products", id, {
      ...data,
    });
    return updatedProduct;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
