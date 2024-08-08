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

export const editSalePoint = createAsyncThunk<
  SalePoint,
  { id: string; title: string },
  { rejectValue: string }
>("salePoints/editSalePoint", async ({ id, title }, { rejectWithValue }) => {
  try {
    const updatedSalePoint = await editDocumentById<SalePoint>(
      "salePoints",
      id,
      {
        title,
      }
    );
    return updatedSalePoint;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const deactivateSalePoint = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("salePoints/deactivateSalePoint", async (id, { rejectWithValue }) => {
  try {
    await editDocumentById<SalePoint>("salePoints", id, {
      isActive: false,
    });
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const deleteSalePoint = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("salePoints/deleteSalePoint", async (id, { rejectWithValue }) => {
  try {
    await deleteDocumentById("salePoints", id);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
