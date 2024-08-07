import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  addSalePoint,
  deleteSalePoint,
  editSalePoint,
  getSalePoints,
} from "./salePointsOperations";

import type { SalePoint } from "../../types";

interface SalePointsSlice {
  salePoints: SalePoint[];
  isLoading: boolean;
}

const initialState: SalePointsSlice = {
  salePoints: [],
  isLoading: false,
};

const salePointsSlice = createSlice({
  name: "salePoints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalePoints.fulfilled, (state, { payload }) => {
        state.salePoints = payload;
      })
      .addCase(addSalePoint.fulfilled, (state, { payload }) => {
        state.salePoints.push(payload);
      })
      .addCase(editSalePoint.fulfilled, (state, { payload }) => {
        const index = state.salePoints.findIndex(
          (salePoint) => salePoint.id === payload.id
        );
        state.salePoints[index] = payload;
      })
      .addCase(deleteSalePoint.fulfilled, (state, { payload }) => {
        const index = state.salePoints.findIndex((elem) => elem.id === payload);
        if (index !== -1) {
          state.salePoints.splice(index, 1);
        }
      })
      .addMatcher(
        isAnyOf(
          getSalePoints.pending,
          addSalePoint.pending,
          editSalePoint.pending,
          deleteSalePoint.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getSalePoints.rejected,
          addSalePoint.rejected,
          editSalePoint.rejected,
          deleteSalePoint.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getSalePoints.fulfilled,
          addSalePoint.fulfilled,
          editSalePoint.fulfilled,
          deleteSalePoint.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectSalePoints: (state) => state.salePoints,
    selectIsLoadingSalePoints: (state) => state.isLoading,
  },
});

export const salePointsReducer = salePointsSlice.reducer;
export const { selectSalePoints, selectIsLoadingSalePoints } =
  salePointsSlice.selectors;
