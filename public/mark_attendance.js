import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const db = getFirestore(app);
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

// Fetch all students
async function loadStudents() {
  const snapshot = await getDocs(collection(db, "users"));
  studentList.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.role === "student") {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>
          <input type="checkbox" class="student" data-id="${doc.id}" /> ${data.name} (${data.email})
        </label><br>
      `;
      studentList.appendChild(div);
    }
  });
}

// Submit attendance
submitBtn.addEventListener("click", async () => {
  const checkboxes = document.querySelectorAll(".student");
  const date = new Date().toISOString().split("T")[0];

  try {
    for (const checkbox of checkboxes) {
      const studentId = checkbox.getAttribute("data-id");
      const status = checkbox.checked ? "Present" : "Absent";
      await addDoc(collection(db, "attendance_records"), {
        date,
        studentId,
        status,
      });
    }

    message.textContent = "✅ Attendance recorded successfully!";
    message.style.color = "green";
  } catch (error) {
    message.textContent = "❌ Error saving attendance: " + error.message;
    message.style.color = "red";
  }
});

loadStudents();
