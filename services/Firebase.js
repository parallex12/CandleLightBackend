import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../env/index.js";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Initialize Firebase
var app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let firebase={ app, db, storage,auth }

export default firebase;
