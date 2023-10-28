import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import firebase from "../services/Firebase.js";

let app = firebase?.app;
let db = firebase?.db;
let storage = firebase?.storage;

export const Query = {
  query_Get_by_id: async (path, id) => await getDoc(doc(db, path, id)),
  query_update_by_id: async (path, id, data) =>
    await setDoc(doc(db, path, id), data,{ merge: true }),
};
