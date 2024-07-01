import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "./../../types/user";

interface authSlice {
  userInfo: UserInfo[];
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: authSlice = {
  userInfo: [],
  accessToken: null,
  refreshToken: null,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    selectInfo: (state) => state.userInfo,
    selectAccessToken: (state) => state.accessToken,
    selectRefreshToken: (state) => state.refreshToken,
    selectIsRefreshing: (state) => state.isRefreshing,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const authReducer = authSlice.reducer;
export const {
  selectInfo,
  selectAccessToken,
  selectRefreshToken,
  selectIsRefreshing,
  selectError,
  selectIsLoading,
} = authSlice.selectors;
