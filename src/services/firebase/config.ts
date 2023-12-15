// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configurationP0O
const firebaseConfig = {
  apiKey: "AIzaSyBoCUd3Kk8DeweN4X_AhDJFzugS1kthkxQ",
  authDomain: "pruebaalex-9f8b4.firebaseapp.com",
  databaseURL: "https://pruebaalex-9f8b4.firebaseio.com",
  projectId: "pruebaalex-9f8b4",
  storageBucket: "pruebaalex-9f8b4.appspot.com",
  messagingSenderId: "802424120094",
  appId: "1:802424120094:web:47b4013cca40cc569a5f0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const db = getFirestore(app);

export { 
  auth,
  db
};

