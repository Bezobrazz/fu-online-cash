import db from "./firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  WithFieldValue,
} from "firebase/firestore";

type FirestoreFieldValue =
  | string
  | number
  | boolean
  | Timestamp
  | DocumentReference;

export const getCollectionData = async <T>(
  collectionName: string
): Promise<T[]> => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const docs = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as T)
    );
    return docs;
  } catch (error) {
    console.error(
      `Error getting data from ${collectionName} collection:`,
      error
    );
    throw error;
  }
};

export const addDocumentToCollection = async <
  T extends WithFieldValue<DocumentData>
>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> => {
  try {
    const colRef = collection(db, collectionName);
    const docRef: DocumentReference = await addDoc(colRef, data);
    return { id: docRef.id, ...data } as T & { id: string };
  } catch (error) {
    console.error(
      `Error adding document to ${collectionName} collection:`,
      error
    );
    throw error;
  }
};

export const editDocumentById = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<T & { id: string }> => {
  try {
    const docRef: DocumentReference = doc(db, collectionName, id);
    await updateDoc(docRef, data);

    const updatedDoc = await getDoc(docRef);

    if (!updatedDoc.exists()) {
      throw new Error(`Document with id ${id} does not exist`);
    }

    return { id: updatedDoc.id, ...updatedDoc.data() } as T & { id: string };
  } catch (error) {
    console.error(
      `Error editing document with id ${id} in ${collectionName} collection:`,
      error
    );
    throw error;
  }
};

export const deleteDocumentById = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document with id ${id} from ${collectionName} collection:`,
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
