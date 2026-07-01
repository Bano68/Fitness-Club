// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
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
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save trainer details in Firestore
    await setDoc(doc(db, "trainers", user.uid), {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      createdAt: new Date().toISOString()
    });

    message.style.color = "green";
    message.textContent = `Trainer account created for ${firstName} ${lastName}!`;
    console.log("Trainer saved:", user.uid);

  } catch (error) {
    message.style.color = "red";
    message.textContent = error.message;
    console.error("Signup error:", error);
  }
});
