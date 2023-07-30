import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 
const firebaseConfig = {
  apiKey: "AIzaSyBn4CwHXP0O1ZBtte1ASFgfZsa1WwinFIk",
  authDomain: "meowmeow-d00b2.firebaseapp.com",
  projectId: "meowmeow-d00b2",
  storageBucket: "meowmeow-d00b2.appspot.com",
  messagingSenderId: "433608811988",
  appId: "1:433608811988:web:5a7aefd40fe4e5c0ee6241",
  measurementId: "G-VERN0WR4LN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);
const analytics = getAnalytics(app);