import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteFromFavorite(imageId) {
  try {
    const docRef = doc(db, "favorites", imageId);
    await deleteDoc(docRef);
    console.log("Deleted!");
  } catch (error) {
    console.error("Error:", error);
  }
}
