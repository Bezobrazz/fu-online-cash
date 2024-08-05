import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, DocumentReference } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { SalePoint } from "../../types";

interface FirestoreSalePoint {
  title: string;
  cashbox: DocumentReference | null;
  enterprise: DocumentReference | null;
}

export const getSalePoints = createAsyncThunk<
  SalePoint[],
  undefined,
  { rejectValue: string }
>("salePoints/getSalePoints", async (_, { rejectWithValue }) => {
  try {
    const snapshot = await getDocs(collection(db, "salePoints"));
    const data = snapshot.docs.map((doc) => {
      const salePointData = doc.data() as FirestoreSalePoint;
      return {
        id: doc.id,
        title: salePointData.title,
        cashbox: salePointData.cashbox ? salePointData.cashbox.path : null,
        enterprise: salePointData.enterprise
          ? salePointData.enterprise.path
          : null,
      } as SalePoint;
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
