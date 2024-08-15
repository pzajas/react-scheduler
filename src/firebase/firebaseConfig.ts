import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7AoPKo1glQOVAQQPVlx3BaUQmrXhTb7g",
  authDomain: "react-scheduler-47673.firebaseapp.com",
  projectId: "react-scheduler-47673",
  storageBucket: "react-scheduler-47673.appspot.com",
  messagingSenderId: "930326137293",
  appId: "1:930326137293:web:360d884065d213ca71dc84",
  measurementId: "G-9QHM06Z664",
};
const FIREBASE = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE);

export { FIREBASE_DB };
