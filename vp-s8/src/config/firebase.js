import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqNrAggRxo2uip1USuQU0UI3s6ZUFem0k",
  authDomain: "vp-techshala.firebaseapp.com",
  projectId: "vp-techshala",
  storageBucket: "vp-techshala.appspot.com",
  messagingSenderId: "15311896039",
  appId: "1:15311896039:web:5b7ca18340da4b529bd142",
  measurementId: "G-JKMHWDLPZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;