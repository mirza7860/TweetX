// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASypLrC82RwG5fvMn54Ly2jsTMKakri_c",
  authDomain: "tweetxal.firebaseapp.com",
  projectId: "tweetxal",
  storageBucket: "tweetxal.appspot.com",
  messagingSenderId: "856308538031",
  appId: "1:856308538031:web:41cdc66c8e4e80a646125a",
  measurementId: "G-HWK54VDNME",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
