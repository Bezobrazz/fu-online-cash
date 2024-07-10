import db from "./firebaseConfig";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

type FirestoreFieldValue =
  | string
  | number
  | boolean
  | Timestamp
  | DocumentReference;

const getCollectionData = async (collectionName: string) => {
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
  return await getCollectionData("salePoints");
};

export const getUsers = async () => {
  return await getCollectionData("users");
};

export const getDocById = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getDocsByIds = async (collectionName: string, ids: string[]) => {
  const promises = ids.map((id) => {
    const docRef = doc(db, collectionName, id);

    return getDoc(docRef);
  });

  const docSnaps = await Promise.all(promises);
  const docs = docSnaps.map((docSnap) =>
    docSnap.exists() ? docSnap.data() : null
  );

  return docs;
};

export const getDocsByFieldValue = async (
  collectionName: string,
  fieldName: string,
  value: FirestoreFieldValue
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return docs;
};
