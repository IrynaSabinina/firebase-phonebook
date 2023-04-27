// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZO6o_EOl0qlta2G_UHS_dkS9iT8wkpdo",
  authDomain: "hello-test-16984.firebaseapp.com",
  databaseURL: "https://hello-test-16984-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hello-test-16984",
  storageBucket: "hello-test-16984.appspot.com",
  messagingSenderId: "194116585917",
  appId: "1:194116585917:web:5395f9ef22eff00baaaad4",
  measurementId: "G-MBCWBN6YYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true
// }); 86BEFD38-E2E6-4CCE-B541-E700E5CA25E6
export default firebaseConfig;










