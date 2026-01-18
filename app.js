// 🔥 Firebase (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ✅ YOUR FIREBASE CONFIG (AS PROVIDED)
const firebaseConfig = {
  apiKey: "AIzaSyDwNs24S-EiHfl58QCi09EpmPfs8zcyC7E",
  authDomain: "safety-observation-hse.firebaseapp.com",
  projectId: "safety-observation-hse",
  storageBucket: "safety-observation-hse.firebasestorage.app",
  messagingSenderId: "642311298981",
  appId: "1:642311298981:web:2bc4b6951eae2f7678d24c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Auto-fill today's date
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("date");
  if (dateInput) dateInput.value = today;
});

// MAIN FUNCTION
async function copyObservation() {
  // Officer name (stored locally)
  let officerName = localStorage.getItem("officerName");
  if (!officerName) {
    officerName = prompt("Enter your name / employee ID");
    if (!officerName) {
      alert("Name is required");
      return;
    }
    localStorage.setItem("officerName", officerName);
  }

  // Collect form data
  const observation = {
    date: document.getElementById("date").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    standard: document.getElementById("standard").value,
    location: document.getElementById("location").value,
    action: document.getElementById("action").value,
    reportedBy: officerName,
    createdAt: serverTimestamp()
  };

  try {
    // Save to Firestore
    await addDoc(collection(db, "observations"), observation);

    // Copy formatted text
    const text = `
🦺 Daily Safety Observation

📅 Date: ${observation.date}
📝 Title: ${observation.title}

👀 Observation:
${observation.description}

📘 Safety Standard: ${observation.standard}
📍 Location: ${observation.location}

✅ Action Taken:
${observation.action}

👤 Reported By: ${observation.reportedBy}
`.trim();

    await navigator.clipboard.writeText(text);

    alert("✅ Observation saved and copied successfully");

  } catch (error) {
    console.error(error);
    alert("❌ Failed to save observation");
  }
}

// 🔴 REQUIRED so button onclick works with modules
window.copyObservation = copyObservation;
