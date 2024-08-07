import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import type { Cashbox } from "../../types";
import {
  addCashbox,
  deleteCashbox,
  editCashbox,
  getCashboxes,
} from "./cashboxesOperations";

interface CashboxesSlice {
  cashboxes: Cashbox[];
  isLoading: boolean;
}

const initialState: CashboxesSlice = {
  cashboxes: [],
  isLoading: false,
};

const cashboxesSlice = createSlice({
  name: "cashboxes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCashboxes.fulfilled, (state, { payload }) => {
        state.cashboxes = payload;
      })
      .addCase(addCashbox.fulfilled, (state, { payload }) => {
        state.cashboxes.push(payload);
      })
      .addCase(editCashbox.fulfilled, (state, { payload }) => {
        const index = state.cashboxes.findIndex(
          (cashbox) => cashbox.id === payload.id
        );
        state.cashboxes[index] = payload;
      })
      .addCase(deleteCashbox.fulfilled, (state, { payload }) => {
        const index = state.cashboxes.findIndex((elem) => elem.id === payload);
        if (index !== -1) {
          state.cashboxes.splice(index, 1);
        }
      })
      .addMatcher(
        isAnyOf(
          getCashboxes.pending,
          addCashbox.pending,
          editCashbox.pending,
          deleteCashbox.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getCashboxes.rejected,
          addCashbox.rejected,
          editCashbox.rejected,
          deleteCashbox.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getCashboxes.fulfilled,
          addCashbox.fulfilled,
          editCashbox.fulfilled,
          deleteCashbox.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectCashboxes: (state) => state.cashboxes,
    selectIsLoadingCashboxes: (state) => state.isLoading,
  },
});

export const cashboxesReducer = cashboxesSlice.reducer;
export const { selectCashboxes, selectIsLoadingCashboxes } =
  cashboxesSlice.selectors;
