// Auto-fill today's date when page loads
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
});

function copyObservation() {
  // Get / remember officer name
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
    reportedBy: officerName
  };

  // 🔴 IMPORTANT: USE ONLY script.googleusercontent.com URL
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbxv8YGW4Ic0DiKtm0fQIjLVi3cYO6wLtuHE7oYUXn7G3eAmXh2ifMVvrM1lGDecJjmj/exec";

  // Send data to Google Sheet (no-cors is REQUIRED)
  fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(observation)
  });

  // Format text for WhatsApp / Outlook
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

  // Copy to clipboard
  navigator.clipboard.writeText(text);

  alert("✅ Observation submitted and copied successfully.");
}
