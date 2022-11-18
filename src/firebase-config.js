// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "@firebase/firestore"

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

measurementId: "G-1YEVL1LXLK"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);