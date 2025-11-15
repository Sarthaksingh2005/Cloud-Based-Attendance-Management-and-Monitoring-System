// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCVwJ7lyaFpD4Qwj4pkY89AuofThHtf3rM",
  authDomain: "university-attendance-7d2e3.firebaseapp.com",
  projectId: "university-attendance-7d2e3",
  storageBucket: "university-attendance-7d2e3.appspot.com",
  messagingSenderId: "598951318749",
  appId: "1:598951318749:web:62500b9a67b88db67ef734",
  measurementId: "G-CX2GERPFSP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
