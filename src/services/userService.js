import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const createUserProfile = async (user, name, role = "customer") => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name,
      email: user.email,
      role: role,
      phone: "",
      profileImage: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
};

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};
