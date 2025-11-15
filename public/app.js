// app.js
import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const message = document.getElementById("message");

  // --- Email/Password Login ---
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
      message.textContent = "Please fill in all fields.";
      message.style.color = "red";
      return;
    }

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore (optional check)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // ✅ Optional role verification
        if (userData.role && userData.role !== role) {
          message.textContent = "❌ Role mismatch. Please select the correct role.";
          message.style.color = "red";
          return;
        }

        message.style.color = "green";
        message.textContent = "Login successful ✅";

        // ✅ Redirect based on role
        setTimeout(() => {
          if (role === "teacher") {
            // Redirect teacher to the new options page
            window.location.href = "teacher_options.html";
          } else {
            // Redirect student to dashboard
            window.location.href = "dashboard_student.html";
          }
        }, 1000);
      } else {
        message.textContent = "❌ User data not found in database.";
        message.style.color = "red";
      }

    } catch (error) {
      message.textContent = "❌ " + error.message;
      message.style.color = "red";
    }
  });
});
