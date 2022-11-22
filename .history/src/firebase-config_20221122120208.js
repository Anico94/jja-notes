// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
  docs,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: "jja-notes",
  storageBucket: "jja-notes.appspot.com",
  messagingSenderId: "421644779194",
  appId: "1:421644779194:web:e04de09e72f600970ecc83",
  measurementId: "G-1YEVL1LXLK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth();

// Sign up

const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: user.email,
      // documentID: user.documentID,
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      updateDoc(docRef, { ref: docRef.id });
    });
    console.log("Sign up successful");
    return [true, user.uid];
  } catch (error) {
    alert("Sign up FAILED:", error.message);
    return { error: error.message };
  }
};

// Sign in

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Signed in as:", user.email);
    return [true, user];
  } catch (error) {
    alert(`Log In FAILED: ${error.message}`);
    return { error: error.message };
  }
};

// Log out

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Signed out");
    return true;
  } catch (error) {
    console.log("Sign out failed successfully");
    return false;
  }
};

// Google login

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        updateDoc(docRef, { ref: docRef.id });
      });
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  signUp,
  signIn,
  logOut,
  sendPasswordReset,
};
