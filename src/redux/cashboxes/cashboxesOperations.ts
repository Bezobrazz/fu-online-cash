import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addDocumentToCollection,
  deleteDocumentById,
  editDocumentById,
  getCollectionData,
} from "../../firebase";
import type { Cashbox, NewCashbox } from "../../types";

export const getCashboxes = createAsyncThunk<
  Cashbox[],
  undefined,
  { rejectValue: string }
>("cashboxes/getCashboxes", async (_, { rejectWithValue }) => {
  try {
    const data = await getCollectionData<Cashbox>("cashboxes");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
