// 🔥 Firebase v9+ (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Auto-fill today's date
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
});

// MAIN FUNCTION
window.copyObservation = async function () {
  // Officer name (stored locally)
  let officerName = localStorage.getItem("officerName");
  if (!officerName) {
    officerName = prompt("Enter your name / employee ID");
    if (!officerName) return alert("Name required");
    localStorage.setItem("officerName", officerName);
  }

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
    await addDoc(collection(db, "observations"), observation);
    alert("✅ Observation saved successfully");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to save observation");
    return;
  }

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

  navigator.clipboard.writeText(text);
};
