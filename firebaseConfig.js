// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, getReactNativePersistence, onAuthStateChanged } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZdwVQbiK1ojl-lmS3ZaJQPRijKtzzHOY",
    authDomain: "app-chat-fa8c1.firebaseapp.com",
    databaseURL: "https://app-chat-fa8c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "app-chat-fa8c1",
    storageBucket: "app-chat-fa8c1.appspot.com",
    messagingSenderId: "35062094508",
    appId: "1:35062094508:web:a9206cd95be97bc8ab5d09",
    measurementId: "G-XJVRWXS5LM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);