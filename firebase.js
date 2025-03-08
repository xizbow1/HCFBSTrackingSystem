// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcLf4EaT3DTfIgpAZWnY_KBoYm_hDsvn0",
  authDomain: "hcfbstrackingsystem.firebaseapp.com",
  projectId: "hcfbstrackingsystem",
  storageBucket: "hcfbstrackingsystem.firebasestorage.app",
  messagingSenderId: "485920168712",
  appId: "1:485920168712:web:dd7a0fbebbcba341922abd",
  measurementId: "G-MP5E2K9BV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);