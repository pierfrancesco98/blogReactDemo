import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut} from "firebase/auth";
import { getDatabase, set, ref, update, push, get, child, remove, onValue } from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL,  ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnfsfxfG8TpyhqCRfMxUtf8NqcfJlLeQs",
  authDomain: "blogreactdemos.firebaseapp.com",
  databaseURL: "https://blogreactdemos-default-rtdb.firebaseio.com",
  projectId: "blogreactdemos",
  storageBucket: "blogreactdemos.appspot.com",
  messagingSenderId: "172090635102",
  appId: "1:172090635102:web:fbcd3a28c2e7d1304295cf"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage();

export { app, database, auth, GoogleAuthProvider, signInWithPopup, signOut, set, ref, update, push, get, child, remove, onValue, storage, uploadBytes, sRef, getDownloadURL};
