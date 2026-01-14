import { db } from "../firebase"; 
import { doc, setDoc } from "firebase/firestore";

export async function saveToFavorite(image) {
  try {
    const docRef = doc(db, "favorites", image.id);
    await setDoc(docRef, {
      url: image.urls.regular,
      author: image.user.name,
      title: image.alt_description || "Untitled",
      savedAt: Date.now()
    });

    console.log("Saved!");
  } catch (error) {
    console.error("Error:", error);
  }
}
