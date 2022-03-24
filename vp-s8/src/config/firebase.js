import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuxxe9krl2245QBMWk5Qxg3yIheEJYb_g",
  authDomain: "vp-hackathon.firebaseapp.com",
  projectId: "vp-hackathon",
  storageBucket: "vp-hackathon.appspot.com",
  messagingSenderId: "411803211946",
  appId: "1:411803211946:web:6842c82707ef286bf198d3",
  measurementId: "G-YSCP16VGS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;