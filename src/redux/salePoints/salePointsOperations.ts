import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SalePoint } from "../../types";
import { getCollectionData } from "../../firebase";

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
