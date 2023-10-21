// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    // createUserWithEmailAndPassword,
    // updateCurrentUser,
    // signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getFirestore, onSnapshot, deleteDoc, doc, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

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
export const db = getFirestore(app);

const productsRef = collection(db, "products"); //* for products collection ref
// const docRef = doc(db,"products/HfQPUQIIYrRXf84cGWu2"); //* for product doc ref

export const useProductsListener = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        return onSnapshot(productsRef, (snapShot) => { //! return for  unsubscribe from snapshot
            setProducts(
                snapShot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
                })
            );
        });
    }, []);

    return products;
};

export const deleteProduct = (id) => {
    deleteDoc(doc(db, "products", id));
};

export const addProduct = () => {
    const uid = auth.currentUser.uid;

    if (!uid) return;

    addDoc(productsRef, {
        name: "iphone",
        description: "lorem ipsum",
        price: 5000,
        uid,
    });
};
