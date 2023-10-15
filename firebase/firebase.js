import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyC2FvyccxuhtS_ehRQJIcTgvvrg6fKLuPc",
  authDomain: "ultimate-destroy-vr.firebaseapp.com",
  projectId: "ultimate-destroy-vr",
  storageBucket: "ultimate-destroy-vr.appspot.com",
  messagingSenderId: "129739006771",
  appId: "1:129739006771:web:471dffd0aab50ab2355446",
  measurementId: "G-SLY3VDN7BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const saveUserWallet = (uid, wallet) => {
  addDoc(collection(db, "user_wallet"), {
    uid,
    wallet,
  });
};

//obtener lista de colecciones
export const getTasks = () => getDocs(collection(db, "tasks"));

//eliminar un documento
export const deleteTasks = (id) => deleteDoc(doc(db, "tasks", id));

//obtner un documento
export const getTask = (id) => getDoc(doc(db, "tasks", id));

//actualziar un documneto
export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

//llamadas asincronas
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);