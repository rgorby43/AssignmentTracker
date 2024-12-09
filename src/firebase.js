// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDr_dKWTXu3FWH85s4ZkeRAEeicTppEakE",
    authDomain: "assignmenttracker-443903.firebaseapp.com",
    projectId: "assignmenttracker-443903",
    storageBucket: "assignmenttracker-443903.firebasestorage.app",
    messagingSenderId: "268560180807",
    appId: "1:268560180807:web:78a492a423ed688ed8b362",
    measurementId: "G-LZFE2PNLJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { db, auth, provider, signInWithPopup, signOut };
