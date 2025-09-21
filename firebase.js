import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCWem00DA3Q6bbfEwDQpWvnuqdD5n9e0Wc",
  authDomain: "habitflow-tracker-419f5.firebaseapp.com",
  projectId: "habitflow-tracker-419f5",
  storageBucket: "habitflow-tracker-419f5.firebasestorage.app",
  messagingSenderId: "26533048066",
  appId: "1:26533048066:web:85de482cf30ba68b549c1b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db };