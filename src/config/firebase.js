// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYrtgFDUfCaX8esSW7nY6ODHZ6P_brftk",
  authDomain: "react-firebase-fbaac.firebaseapp.com",
  projectId: "react-firebase-fbaac",
  storageBucket: "react-firebase-fbaac.appspot.com",
  messagingSenderId: "542908127513",
  appId: "1:542908127513:web:115b4f5dab0bada4d6cd88",
  measurementId: "G-K6V3QVV4M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);