// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  // updateCurrentUser,
  // signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYrtgFDUfCaX8esSW7nY6ODHZ6P_brftk",
  authDomain: "react-firebase-fbaac.firebaseapp.com",
  projectId: "react-firebase-fbaac",
  storageBucket: "react-firebase-fbaac.appspot.com",
  messagingSenderId: "542908127513",
  appId: "1:542908127513:web:115b4f5dab0bada4d6cd88",
  measurementId: "G-K6V3QVV4M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app); //* for analytics

// export const signUp = async (username, email, password) => {
//   await createUserWithEmailAndPassword(auth, email, password);
//   await updateCurrentUser(auth, { displayName: username });
// };

// export const signIn = async (email, password) => {
//     await signInWithEmailAndPassword(auth,email,password)
// };
