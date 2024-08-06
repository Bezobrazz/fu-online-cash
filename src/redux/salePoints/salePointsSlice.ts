import { createSlice } from "@reduxjs/toolkit";
import { getSalePoints } from "./salePointsOperations";

import type { SalePoint } from "../../types";

interface SalePointsSlice {
  salePoints: SalePoint[];
}

const initialState: SalePointsSlice = {
  salePoints: [],
};

const salePointsSlice = createSlice({
  name: "salePoints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalePoints.fulfilled, (state, { payload }) => {
      state.salePoints = payload;
    });
  },
  selectors: {
    selectSalePoints: (state) => state.salePoints,
  },
});

export const salePointsReducer = salePointsSlice.reducer;
export const { selectSalePoints } = salePointsSlice.selectors;
