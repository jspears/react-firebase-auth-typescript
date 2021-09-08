import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import {  auth, firestore } from '../firebase';
import { collection, doc, setDoc, query, where, getDocs,  } from "firebase/firestore";


export const signInWith = async (provider = new GoogleAuthProvider, authProvider = provider.providerId) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const result = await getDocs(query(collection(firestore, "users"), where("email", "==", user.email)));
    if (result.size === 0) {
      await setDoc(doc(collection(firestore, 'users')), {
        ...user,
        authProvider
      });
    }
  } catch (err) {
    console.error(err);
  }
};