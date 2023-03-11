import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_DOMAIN,
  projectId: "react-crud-ef959",
  storageBucket: "react-crud-ef959.appspot.com",
  messagingSenderId: "818677155732",
  appId: "1:818677155732:web:ee2ffa7c7bb42f4037b181",
  measurementId: "G-XZJ2N1CDG6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);