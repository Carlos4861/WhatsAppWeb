import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpStD58f4P-MpL5ejKjjVTYvlO5Z8XDyU",
  authDomain: "whatsappclone-ead5c.firebaseapp.com",
  databaseURL: "https://whatsappclone-ead5c-default-rtdb.firebaseio.com",
  projectId: "whatsappclone-ead5c",
  storageBucket: "whatsappclone-ead5c.firebasestorage.app",
  messagingSenderId: "142528691308",
  appId: "1:142528691308:web:3ef5f1a600afe9bfe92c49",
  measurementId: "G-JRRW5C4HH5"
};

// Initialize Firebase
const app = initializeApp(firebase);
const database = getDatabase(app);

export { database, ref, set, onValue };