// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth , signOut } from "firebase/auth";
import { getDocs, getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ7frBsz4PtY73Lo8XSwtOKMsz__cQvzs",
  authDomain: "realsupportacademy-5aa45.firebaseapp.com",
  projectId: "realsupportacademy-5aa45",
  storageBucket: "realsupportacademy-5aa45.appspot.com",
  messagingSenderId: "46129086412",
  appId: "1:46129086412:web:e9b74bebee3583fa076769",
  measurementId: "G-4TN4439EN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


export default firebase_app;

const auth = getAuth(app);

export { auth, app };

// logout function
export const logout = () => {
    return auth.signOut();
}


// init db 
const db = getFirestore();

export {db}
