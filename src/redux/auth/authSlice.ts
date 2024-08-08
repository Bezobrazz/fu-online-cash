import { createSlice } from "@reduxjs/toolkit";

import { Role, type UserInfo } from "./../../types/user";

interface authSlice {
  userInfo: UserInfo;
  isRefreshing: boolean;
  error: string | null;
  isLoading: boolean;
}

const userSample: UserInfo = {
  id: "12345",
  name: "John Doe",
  phone: "+1234567890",
  role: Role.Owner,
  enterpriseId: "A0jYCcdJEC1LuairkZnO",
};

const initialState: authSlice = {
  userInfo: userSample,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectIsRefreshing: (state) => state.isRefreshing,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const authReducer = authSlice.reducer;
export const {
  selectUserInfo,
  selectIsRefreshing,
  selectError,
  selectIsLoading,
} = authSlice.selectors;
