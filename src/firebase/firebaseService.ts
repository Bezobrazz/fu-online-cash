import db from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const getCollectionData = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return docs;
  } catch (error) {
    console.error(
      `Error getting data from ${collectionName} collection:`,
      error
    );
    throw error;
  }
};

export const getCashboxes = async () => {
  return await getCollectionData("cashboxes");
};

export const getEnterprises = async () => {
  return await getCollectionData("enterprises");
};

export const getSalePoints = async () => {
  return await getCollectionData("sale-points");
};

export const getUsers = async () => {
  return await getCollectionData("users");
};
