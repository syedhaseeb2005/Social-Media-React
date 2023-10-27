// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage , getDownloadURL , uploadBytesResumable , ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBxgOCT1NvTAvG0UlQQrK6QAnhh6ALr4A",
  authDomain: "social-media-react-5a544.firebaseapp.com",
  projectId: "social-media-react-5a544",
  storageBucket: "social-media-react-5a544.appspot.com",
  messagingSenderId: "892416889250",
  appId: "1:892416889250:web:6e0beb32149effc488e2fb",
  measurementId: "G-938JF8P4D3"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {app , storage,getDownloadURL , uploadBytesResumable , ref}