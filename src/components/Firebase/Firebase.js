import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut} from "firebase/auth";
import { getDatabase, set, ref, update, push, get, child, remove, onValue } from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL,  ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage();

export { app, database, auth, GoogleAuthProvider, signInWithPopup, signOut, set, ref, update, push, get, child, remove, onValue, storage, uploadBytes, sRef, getDownloadURL};
