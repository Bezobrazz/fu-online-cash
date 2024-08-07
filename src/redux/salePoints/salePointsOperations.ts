import { createAsyncThunk } from "@reduxjs/toolkit";

import type { NewSalePoint, SalePoint } from "../../types";
import {
  addDocumentToCollection,
  deleteDocumentById,
  editDocumentById,
  getCollectionData,
} from "../../firebase";

export const getSalePoints = createAsyncThunk<
  SalePoint[],
  undefined,
  { rejectValue: string }
>("salePoints/getSalePoints", async (_, { rejectWithValue }) => {
  try {
    const data = await getCollectionData<SalePoint>("salePoints");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const addSalePoint = createAsyncThunk<
  SalePoint,
  NewSalePoint,
  { rejectValue: string }
>("salePoints/addSalePoint", async (salePoint, { rejectWithValue }) => {
  try {
    const newSalePoint = await addDocumentToCollection("salePoints", salePoint);
    return newSalePoint;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
