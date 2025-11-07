import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

const progressCollection = collection(db, 'userProgress');

export const getUserProgress = async (uid: string): Promise<string[]> => {
  try {
    const userDocRef = doc(progressCollection, uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // Asegurarse de que el campo existe y es un array
      const data = docSnap.data();
      return Array.isArray(data.completedChallenges) ? data.completedChallenges : [];
    } else {
      // El documento no existe, el usuario es nuevo
      console.log("No such document! Creating one for new user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    return [];
  }
};

export const updateUserProgress = async (uid: string, completedChallenges: string[]): Promise<void> => {
  try {
    const userDocRef = doc(progressCollection, uid);
    await setDoc(userDocRef, { completedChallenges });
  } catch (error) {
    console.error("Error updating user progress:", error);
    // Podrías manejar el error de forma más robusta, ej. reintentos o feedback al usuario
  }
};
