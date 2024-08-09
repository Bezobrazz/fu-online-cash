import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import type { UserInfo } from "../../types";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getEmployees,
} from "./employeeOperations";

interface EmployeesSlice {
  employees: UserInfo[];
  isLoading: boolean;
}

const initialState: EmployeesSlice = {
  employees: [],
  isLoading: false,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload;
        state.isLoading = false;
      })
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.employees.push(payload);
        state.isLoading = false;
      })
      .addCase(editEmployee.fulfilled, (state, { payload }) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === payload.id
        );
        state.employees[index] = payload;
        state.isLoading = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        const index = state.employees.findIndex((elem) => elem.id === payload);
        if (index !== -1) {
          state.employees.splice(index, 1);
        }
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getEmployees.pending,
          addEmployee.pending,
          editEmployee.pending,
          deleteEmployee.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getEmployees.rejected,
          addEmployee.rejected,
          editEmployee.rejected,
          deleteEmployee.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectEmployees: (state) => state.employees,
    selectIsLoadingEmployees: (state) => state.isLoading,
  },
});

export const employeesReducer = employeesSlice.reducer;
export const { selectEmployees, selectIsLoadingEmployees } =
  employeesSlice.selectors;
