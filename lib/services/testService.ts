import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Test } from "@/lib/data";

const COLLECTION_NAME = "tests";

export const testService = {
  // Create
  async add(data: Omit<Test, "id">) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding test:", error);
      throw error;
    }
  },

  // Read All
  async getAll() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Test[];
    } catch (error) {
      console.error("Error getting tests:", error);
      throw error;
    }
  },

  // Update
  async update(id: string, data: Partial<Test>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating test:", error);
      throw error;
    }
  },

  // Delete
  async delete(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting test:", error);
      throw error;
    }
  }
};
