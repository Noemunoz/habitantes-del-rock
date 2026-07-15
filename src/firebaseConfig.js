import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDx8ZWX76YzmqvNbaUALhkypMdb1287YpI",
  authDomain: "habitantes-del-rock-3d109.firebaseapp.com",
  projectId: "habitantes-del-rock-3d109",
  storageBucket: "habitantes-del-rock-3d109.firebasestorage.app",
  messagingSenderId: "846210179043",
  appId: "1:846210179043:web:3255953d4901a4450f4ad6"
};

// Inicializamos Firebase y exportamos la base de datos (db)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);