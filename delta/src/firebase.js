import "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: "https://delta-859a1-default-rtdb.firebaseio.com",
  projectId: "delta-859a1",
  storageBucket: "delta-859a1.appspot.com",
  messagingSenderId: "385538735504",
  appId: "1:385538735504:web:703abb7ffb0d181a54c715",
  measurementId: "G-58J6ZNHBET"
};

const app = initializeApp(firebaseConfig);
export const author = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();