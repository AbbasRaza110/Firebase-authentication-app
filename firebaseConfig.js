import {  initializeApp } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSU7IxC4PsMy5m7pIM7NVtvdAS3ZmahB0",
  authDomain: "fir-authentication-c3496.firebaseapp.com",
  projectId: "fir-authentication-c3496",
  storageBucket: "fir-authentication-c3496.firebasestorage.app",
  messagingSenderId: "387191839266",
  appId: "1:387191839266:web:3251807002cd5ecf11c87b",
  measurementId: "G-CEZHYMKENL"
};

let app

if (!auth().app) {
  app = initializeApp(firebaseConfig);
}

export { auth, firestore };
