// fetchUsers.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../fbconfig"; // Adjust path as per your firebaseConfig location

const fetchUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("eompe",usersList)
  return usersList;
};

export default fetchUsers;
