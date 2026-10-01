import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2RwNM-WkOyPTefcF2hjdX1E0XkhLsKGM",
  authDomain: "exploriademo.firebaseapp.com",
  projectId: "exploriademo",
  storageBucket: "exploriademo.firebasestorage.app",
  messagingSenderId: "17561345333",
  appId: "1:17561345333:web:63f3eb13ec1fbfcb68407c",
  measurementId: "G-EKRFZE5PVP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
