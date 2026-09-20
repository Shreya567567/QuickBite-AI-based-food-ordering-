import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Add Menu Item
export const addMenu = async (menuData) => {
  const docRef = await addDoc(collection(db, "menus"), {
    ...menuData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

// Get Menu By Restaurant
export const getMenusByRestaurant = async (restaurantId) => {
  const q = query(
    collection(db, "menus"),
    where("restaurantId", "==", restaurantId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get Single Menu
export const getMenuById = async (id) => {
  const snapshot = await getDoc(doc(db, "menus", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

// Update Menu
export const updateMenu = async (id, data) => {
  await updateDoc(doc(db, "menus", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Delete Menu
export const deleteMenu = async (id) => {
  await deleteDoc(doc(db, "menus", id));
};