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

// Add Restaurant
export const addRestaurant = async (restaurantData) => {
  const docRef = await addDoc(collection(db, "restaurants"), {
    ...restaurantData,

    rating: 0,
    totalReviews: 0,

    verified: false,
    isOpen: true,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

// Get All Restaurants
export const getAllRestaurants = async () => {
  const snapshot = await getDocs(collection(db, "restaurants"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get Restaurant By ID
export const getRestaurantById = async (id) => {
  const snapshot = await getDoc(doc(db, "restaurants", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

// Get Restaurants By Owner
export const getRestaurantsByOwner = async (ownerId) => {
  const q = query(
    collection(db, "restaurants"),
    where("ownerId", "==", ownerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Update Restaurant
export const updateRestaurant = async (id, data) => {
  await updateDoc(doc(db, "restaurants", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Delete Restaurant
export const deleteRestaurant = async (id) => {
  await deleteDoc(doc(db, "restaurants", id));
};