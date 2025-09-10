// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgn_P3BRIDe1_KSAmFRa2VJCvvwtLxOhY",
  authDomain: "reactapp-study.firebaseapp.com",
  projectId: "reactapp-study",
  storageBucket: "reactapp-study.firebasestorage.app",
  messagingSenderId: "828965251783",
  appId: "1:828965251783:web:f0ac54a6f0a0e5c426ece2",
  measurementId: "G-DWXV9NZ58G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth service
export const auth = getAuth(app);
export const Googleprovider = new GoogleAuthProvider();

// readig the data
export const db = getFirestore(app);
export const storage = getStorage(app);