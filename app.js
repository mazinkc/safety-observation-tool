document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;
});

// Save observation to local storage
function saveObservation(data) {
  let observations = JSON.parse(localStorage.getItem("observations")) || [];
  observations.push(data);
  localStorage.setItem("observations", JSON.stringify(observations));
}

function copyObservation() {
  const observation = {
    date: document.getElementById("date").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    standard: document.getElementById("standard").value,
    location: document.getElementById("location").value,
    action: document.getElementById("action").value,
    timestamp: new Date().toISOString()
  };

  const text = `
🦺 Daily Safety Observation

📅 Date: ${observation.date}
📝 Title: ${observation.title}

👀 Observation:
${observation.description}

📘 Standard: ${observation.standard}
📍 Location: ${observation.location}

✅ Action Taken:
${observation.action}
`.trim();

  // Save locally
  saveObservation(observation);

  // Copy
  const output = document.getElementById("output");
  output.value = text;
  output.select();
  navigator.clipboard.writeText(output.value);

  alert("Observation saved & copied successfully.");
}
