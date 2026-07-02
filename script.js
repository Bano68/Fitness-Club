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

// ✅ Ensure DOM is loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  if (!loginForm) {
    console.error("Login form not found in DOM");
    return;
  }

  loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const emailField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    if (!emailField || !passwordField) {
      console.error("Username or password input not found in DOM");
      return;
    }

    const emailInput = emailField.value.trim().toLowerCase();
    const passwordInput = passwordField.value.trim();

    try {
      // Fetch all trainers from Firestore
      const snapshot = await getDocs(collection(db, "trainers"));
      let found = false;

      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Trainer doc:", data); // 👀 Debugging line

        const trainerEmail = (data.email || data.Email)?.trim().toLowerCase();
        const trainerPassword = (data.password || data.Password)?.trim();

        if (trainerEmail === emailInput && trainerPassword === passwordInput) {
          found = true;
        }
      });

      if (found) {
        message.style.color = "green";
        message.textContent = "Yahoo! Login successful! Redirecting...";

        // ✅ Redirect to dashboard
        setTimeout(() => {
          window.location.href = "index2.html";
        }, 1000);

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
});
