// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWyU546VPEAqIH7G3SxV2Axsi-9OJiJiw",
  authDomain: "careebloom.firebaseapp.com",
  projectId: "careebloom",
  storageBucket: "careebloom.firebasestorage.app",
  messagingSenderId: "327479038753",
  appId: "1:327479038753:web:2c3444ad9af89a33d06460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth, provider};