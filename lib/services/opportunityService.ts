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
import { Opportunity } from "@/lib/data";

const COLLECTION_NAME = "opportunities";

export const opportunityService = {
  // Create
  async add(data: Omit<Opportunity, "id">) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding opportunity:", error);
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
      })) as Opportunity[];
    } catch (error) {
      console.error("Error getting opportunities:", error);
      throw error;
    }
  },

  // Read One
  async getById(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Opportunity;
      }
      return null;
    } catch (error) {
      console.error("Error getting opportunity:", error);
      throw error;
    }
  },

  // Update
  async update(id: string, data: Partial<Opportunity>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating opportunity:", error);
      throw error;
    }
  },

  // Delete
  async delete(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting opportunity:", error);
      throw error;
    }
  }
};
