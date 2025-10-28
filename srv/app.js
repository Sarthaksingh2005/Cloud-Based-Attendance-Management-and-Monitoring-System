import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCVwJ7lyaFpD4Qwj4pkY89AuofThHtf3rM",
  authDomain: "university-attendance-7d2e3.firebaseapp.com",
  projectId: "university-attendance-7d2e3",
  storageBucket: "university-attendance-7d2e3.firebasestorage.app",
  messagingSenderId: "598951318749",
  appId: "1:598951318749:web:62500b9a67b88db67ef734",
  measurementId: "G-CX2GERPFSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const googleBtn = document.getElementById("googleLogin");
  const message = document.getElementById("message");

  // Email/Password login
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      message.textContent = "Please fill in both fields.";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.style.color = "green";
      message.textContent = "Login successful ✅";
      //setTimeout(() => (window.location.href = "dashboard.html"), 1000);
    } catch (error) {
      message.textContent = "❌ " + error.message;
    }
  });

  // Google Login
  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      message.style.color = "green";
      message.textContent = "Google login successful ✅";
      setTimeout(() => (window.location.href = "dashboard.html"), 1000);
    } catch (error) {
      message.textContent = "❌ " + error.message;
    }
  });
});
