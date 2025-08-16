import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAnXZn2O1DMYtb1ZXx7PREeBMUDsvIwAME",
  authDomain: "netflix-clone-3b5fb.firebaseapp.com",
  projectId: "netflix-clone-3b5fb",
  storageBucket: "netflix-clone-3b5fb.firebasestorage.app",
  messagingSenderId: "1057364822536",
  appId: "1:1057364822536:web:f74b16459a2f44bce1dfbd",
  measurementId: "G-Y5S8Y6MCF2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
 
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}