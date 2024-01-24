import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blogapp-40c8b.firebaseapp.com",
  projectId: "blogapp-40c8b",
  storageBucket: "blogapp-40c8b.appspot.com",
  messagingSenderId: "170734363936",
  appId: "1:170734363936:web:371dc7cee970bc4d81a345",
  measurementId: "G-2P5JPRCT8X",
};

export const app = initializeApp(firebaseConfig);