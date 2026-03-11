// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3--bmJbn20dqoGvKt619gg7WfL90e33A",
  authDomain: "sungmo-dajeong-wedding.firebaseapp.com",
  projectId: "sungmo-dajeong-wedding",
  storageBucket: "sungmo-dajeong-wedding.firebasestorage.app",
  messagingSenderId: "158339530891",
  appId: "1:158339530891:web:f923989a7fe6c992c6948e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
export const db = getFirestore(app);