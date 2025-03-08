// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Log configuration (remove in production)
console.log('Firebase config:', { 
  apiKey: process.env.APIKEY ? "Present" : "Missing",
  authDomain: process.env.AUTHDOMAIN ? "Present" : "Missing",
  // Other fields...
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword };