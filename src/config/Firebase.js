import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfhjXrvCi2e6M1vSNj1uCkC_zjD83m7CA",
  authDomain: "chat-application-786.firebaseapp.com",
  projectId: "chat-application-786",
  storageBucket: "chat-application-786.firebasestorage.app",
  messagingSenderId: "1008379840779",
  appId: "1:1008379840779:web:f2ab922a4374b87d8a3a0e",
  measurementId: "G-7ESLCT5Z4B"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db,
    onAuthStateChanged
}