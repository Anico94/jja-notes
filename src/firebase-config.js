import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
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
  updateProfile,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

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
    }).then(function (docRef) {
      updateDoc(docRef, { ref: docRef.id });
    });
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
    return true;
  } catch (error) {
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
        updateDoc(docRef, { ref: docRef.id });
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent");
  } catch (error) {
    alert(error.message);
  }
};
const changeUserName = async (name) => {
  await updateProfile(auth.currentUser, {
    displayName: name,
  }).catch((error) => {
    console.log(error);
  });
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signUp,
  signIn,
  logOut,
  sendPasswordReset,
  changeUserName,
};
