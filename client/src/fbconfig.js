import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "",
    authDomain: "crud-5a8d3.firebaseapp.com",
    databaseURL: "https://crud-5a8d3-default-rtdb.firebaseio.com",
    projectId: "crud-5a8d3",
    storageBucket: "crud-5a8d3.appspot.com",
    messagingSenderId: "378338927773",
    appId: "",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default firebaseConfig;