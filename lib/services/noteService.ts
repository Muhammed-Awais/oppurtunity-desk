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
  getDoc,
  increment
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Note } from "@/lib/data";

const COLLECTION_NAME = "notes";

export const noteService = {
  // Create
  async add(data: Omit<Note, "id">) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        downloads: data.downloads || 0,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding note:", error);
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
      })) as Note[];
    } catch (error) {
      console.error("Error getting notes:", error);
      throw error;
    }
  },

  // Read One
  async getById(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Note;
      }
      return null;
    } catch (error) {
      console.error("Error getting note:", error);
      throw error;
    }
  },

  // Increment download count
  async incrementDownloads(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { downloads: increment(1) });
    } catch (error) {
      console.error("Error incrementing downloads:", error);
      throw error;
    }
  },

  // Update
  async update(id: string, data: Partial<Note>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  // Delete
  async delete(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
};
