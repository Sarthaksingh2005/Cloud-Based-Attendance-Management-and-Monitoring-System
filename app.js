// =====================
// Firebase Configuration
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyDcFFH6_OtL2eLN5B9S-VP5BNctbC3VlJk",
  authDomain: "attendance-system-8496d.firebaseapp.com",
  databaseURL: "https://attendance-system-8496d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "attendance-system-8496d",
  storageBucket: "attendance-system-8496d.firebasestorage.app",
  messagingSenderId: "549001624007",
  appId: "1:549001624007:web:10dec25c5cac803e5b81e2",
  measurementId: "G-MJHKVMQTYQ"
};

// =====================
// Initialize Firebase
// =====================
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase initialized successfully!");

// =====================
// Firebase References
// =====================
const auth = firebase.auth();
const database = firebase.database();

// =====================
// Login Function
// =====================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (email === "" || password === "") {
    message.innerText = "⚠️ Please enter both email and password.";
    return;
  }

  // Sign in using Firebase Authentication
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      message.innerText = `✅ Login successful! Welcome ${user.email}`;

      // Optional: Update login timestamp in Realtime Database
      const userId = user.uid;
      database.ref("users/" + userId + "/lastLogin").set(Date.now());

    })
    .catch((error) => {
      console.error(error);
      message.innerText = "❌ Error: " + error.message;
    });
}
