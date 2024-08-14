// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbRb-zmC5boQlrzvkLyG2FHBpI56bYiJ8",
  authDomain: "newjb-d8457.firebaseapp.com",
  projectId: "newjb-d8457",
  storageBucket: "newjb-d8457.appspot.com",
  messagingSenderId: "565395515185",
  appId: "1:565395515185:web:352c32dc4260a0146eb210",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export default app;
