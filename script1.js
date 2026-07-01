// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Handle signup form
document.getElementById("signupForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("signupMessage");

  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Passwords do not match!";
    return;
  }

  try {
    // ✅ Check if email already exists
    const q = query(collection(db, "trainers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      message.style.color = "red";
      message.textContent = "Email is already registered!";
      return;
    }

    // ✅ Save trainer directly in Firestore
    await addDoc(collection(db, "trainers"), {
      firstName,
      lastName,
      dob,
      email,
      password, // ⚠️ stored directly
      createdAt: new Date().toISOString()
    });

    message.style.color = "green";
    message.textContent = `Trainer account created for ${firstName} ${lastName}!`;
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error: " + error.message;
    console.error("Signup error:", error);
  }
});
