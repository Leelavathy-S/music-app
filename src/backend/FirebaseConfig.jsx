// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnqZs1UEoM-ZQdYpEiUTrg7UR1DJMnACA",
  authDomain: "innovators-hub-music-c10c4.firebaseapp.com",
  projectId: "innovators-hub-music-c10c4",
  storageBucket: "innovators-hub-music-c10c4.firebasestorage.app",
  messagingSenderId: "931048802579",
  appId: "1:931048802579:web:0fbc4ddc461e131a2172e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH = getAuth(firebaseApp)
export const __DB = getFirestore(firebaseApp)
