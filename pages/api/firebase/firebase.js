import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  setDoc,
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


const data ={
  wallet: "your wallet 😒"
};


 export const saveUserWallet = (uid) => {
   setDoc(doc(db, "user_wallet", uid), data);
   
   addDoc(collection(db, "user_wallet", uid, "nft"), {
    name: "Tokyo",
    color: "Japan"
  });


 };

//actualziar un documneto
export const updateUserWallet = (newFields) => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const id = user.uid;
      updateDoc(doc(db, "user_wallet", id), newFields)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
 };


//obtener lista de colecciones
export const getTasks = () => getDocs(collection(db, "tasks"));

//eliminar un documento
export const deleteTasks = (id) => deleteDoc(doc(db, "tasks", id));

//obtner un documento
export const getTask = (id) => getDoc(doc(db, "tasks", id));


//llamadas asincronas
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);
