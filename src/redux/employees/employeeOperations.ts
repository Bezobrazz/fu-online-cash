import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addDocumentToCollection,
  deleteDocumentById,
  editDocumentById,
  getCollectionData,
} from "../../firebase";
import { NewUser, UserInfo } from "../../types";

export const getEmployees = createAsyncThunk<
  UserInfo[],
  undefined,
  { rejectValue: string }
>("employees/getEmployees", async (_, { rejectWithValue }) => {
  try {
    const data = await getCollectionData<UserInfo>("users");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const addEmployee = createAsyncThunk<
  UserInfo,
  NewUser,
  { rejectValue: string }
>("employees/addEmployee", async (user, { rejectWithValue }) => {
  try {
    const newUser = await addDocumentToCollection("users", user);
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const editEmployee = createAsyncThunk<
  UserInfo,
  { id: string; data: NewUser },
  { rejectValue: string }
>("employees/editEmployee", async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedSEmployee = await editDocumentById<UserInfo>("users", id, {
      ...data,
    });
    return updatedSEmployee;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employees/deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    await deleteDocumentById("users", id);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
