// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrnrytI-dCEeF9PxG4VgIA1BW8HnmqfNY",
  authDomain: "sinv-d5340.firebaseapp.com",
  projectId: "sinv-d5340",
  storageBucket: "sinv-d5340.appspot.com", // исправлено!
  messagingSenderId: "230209353303",
  appId: "1:230209353303:web:037fd24d8c0eb916dd1512"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Firestore (основная база)
export const db = getFirestore(app);

// Firebase Storage (для загрузки файлов)
export const storage = getStorage(app);
