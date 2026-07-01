// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOKesqaDCCEGY1uC4CJkO-MpGHjfKF3pk",
  authDomain: "gymmembersinventory.firebaseapp.com",
  projectId: "gymmembersinventory",
  storageBucket: "gymmembersinventory.appspot.com",
  messagingSenderId: "133902790400",
  appId: "1:133902790400:web:9deb2c79c1249698360de5",
  measurementId: "G-K4W1RGR9GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOGIN FORM HANDLER
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  try {
    // ✅ Get all trainers from Firestore
    const snapshot = await getDocs(collection(db, "trainers"));
    let found = false;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === email && data.password === password) {
        found = true;
      }
    });

    if (found) {
      message.style.color = "green";
      message.textContent = "Yahoo! Login successful!";
    } else {
      message.style.color = "red";
      message.textContent = "Account not existed or password not matches.";
    }

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error: " + error.message;
    console.error("Login error:", error);
  }
});
