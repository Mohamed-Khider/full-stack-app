import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts")); // Fetch all docs
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { data: usersData, error: null }; // Return as { data, error }
  } catch (error) {
    console.error("Error fetching users: ", error);
    return { data: [], error }; // Return empty data on error
  }
};
