// Auto-fill today's date
window.onload = function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
};

function copyObservation() {
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const standard = document.getElementById("standard").value;
  const location = document.getElementById("location").value;
  const action = document.getElementById("action").value;

  const text = `
🦺 Daily Safety Observation

📅 Date: ${date}
📝 Title: ${title}

👀 Observation:
${description}

📘 Standard: ${standard}
📍 Location: ${location}

✅ Action Taken:
${action}
`;

  const output = document.getElementById("output");
  output.value = text.trim();

  output.select();
  navigator.clipboard.writeText(output.value);

  alert("Copied! Paste in WhatsApp or Outlook.");
}
