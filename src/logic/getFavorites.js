import { db } from "../firebase";
import { collection, query, orderBy, getDocs }  from "firebase/firestore";
import { col } from "framer-motion/client";

export const getFavorites = async () => {
    try{ 
        const order = query(collection(db, "favorites"), orderBy("savedAt", "desc"));
        const querySnapshot = await getDocs(order);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    catch (error) {
        console.error("Error: ", error);
    }
};