// dashboard.js
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

async function loadDashboard(user) {
  const attendanceDiv =
    document.getElementById("attendanceList") ||
    document.getElementById("attendanceData");
  attendanceDiv.innerHTML = "<p>Loading attendance...</p>";

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      attendanceDiv.innerHTML = "<p style='color:red;'>User data not found in Firestore.</p>";
      return;
    }

    const userData = userSnap.data();

    if (userData.role === "teacher") {
      // ✅ Teacher view: Show all students
      const querySnapshot = await getDocs(collection(db, "users"));
      attendanceDiv.innerHTML = "<h3>All Students:</h3>";
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.role === "student") {
          const entry = document.createElement("p");
          entry.textContent = `${data.name} — ${data.attendedLectures}/${data.totalLectures} Lectures`;
          attendanceDiv.appendChild(entry);
        }
      });
    } else {
      // ✅ Student view: Show only own attendance
      attendanceDiv.innerHTML = `
        <h3>Your Attendance:</h3>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Attended Lectures:</strong> ${userData.attendedLectures}</p>
        <p><strong>Total Lectures:</strong> ${userData.totalLectures}</p>
      `;
    }
  } catch (error) {
    attendanceDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// ✅ Ensure the user is logged in before fetching data
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadDashboard(user);
  } else {
    window.location.href = "index.html"; // redirect to login if not logged in
  }
});
