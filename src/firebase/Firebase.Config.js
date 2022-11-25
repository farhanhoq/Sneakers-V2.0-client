// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8qFJ6aCV9D_BgBkdJwyAvEe1lns87M_Y",
  authDomain: "sneakers-v2.firebaseapp.com",
  projectId: "sneakers-v2",
  storageBucket: "sneakers-v2.appspot.com",
  messagingSenderId: "210777815952",
  appId: "1:210777815952:web:3bbb34550879b0ec569115",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;