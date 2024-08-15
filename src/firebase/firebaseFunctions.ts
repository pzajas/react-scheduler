import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

export const getCollectionItems = async <T>(
  firestoreCollection: string
): Promise<T[] | undefined> => {
  try {
    const data: T[] = await fetchItems(firestoreCollection);
    return data || [];
  } catch (error) {
    console.error("Error fetching collection items:", error);
    return [];
  }
};

export const fetchItems = async <T>(
  firestoreCollection: string
): Promise<T[]> => {
  let q = null;

  q = query(collection(FIREBASE_DB, firestoreCollection));

  const querySnapshot = await getDocs(q);
  const allItems: T[] = [];
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    allItems.push(item as T);
  });
  return allItems;
};
