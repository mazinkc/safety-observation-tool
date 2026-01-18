document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;
});

function copyObservation() {
  const observation = {
    date: document.getElementById("date").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    standard: document.getElementById("standard").value,
    location: document.getElementById("location").value,
    action: document.getElementById("action").value,
    reportedBy: prompt("Enter your name / employee id")
  };

  // Google Apps Script Web App URL
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbwY7N5P2o3vwi6OEYYp2aTCAJtC6qZVH1tpOfqge4kjlE0sic9fniDu71GjOC66GvHC/exec";

  // Send data to Google Sheet
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(observation),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(() => {
      console.log("Observation saved to central sheet");
    })
    .catch(err => {
      console.error("Error saving observation", err);
      alert("Error saving observation. Check internet.");
    });

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

  alert("Observation saved centrally and copied successfully.");
}
