// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOKesqaDCCEGY1uC4CJkO-MpGHjfKF3pk",
  authDomain: "gymmembersinventory.firebaseapp.com",
  projectId: "gymmembersinventory",
  storageBucket: "gymmembersinventory.firebasestorage.app",
  messagingSenderId: "133902790400",
  appId: "1:133902790400:web:9deb2c79c1249698360de5",
  measurementId: "G-K4W1RGR9GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN FORM HANDLER
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  try {
    // ✅ Sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;

    // ✅ Check if trainer exists in Firestore
    const trainerRef = doc(db, "trainers", user.uid);
    const trainerSnap = await getDoc(trainerRef);

    if (trainerSnap.exists()) {
      message.style.color = "green";
      message.textContent = "Yahoo! Login successful!";
    } else {
      message.style.color = "red";
      message.textContent = "Invalid username or password.";
    }

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Invalid username or password.";
    console.error("Login error:", error);
  }
});
