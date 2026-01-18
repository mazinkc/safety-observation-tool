// Run after HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  // Set date in YYYY-MM-DD format
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
});

function copyObservation() {
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const standard = document.getElementById("standard").value;
  const location = document.getElementById("location").value;
  const action = document.getElementById("action").value;

  const formattedText = `
🦺 Daily Safety Observation

📅 Date: ${date}
📝 Title: ${title}

👀 Observation Description:
${description}

📘 Safety Standard: ${standard}
📍 Location: ${location}

✅ Action Taken:
${action}
`.trim();

  const output = document.getElementById("output");
  output.value = formattedText;

  output.select();
  output.setSelectionRange(0, 99999); // For mobile
  navigator.clipboard.writeText(output.value);

  alert("Observation copied! Paste directly into WhatsApp or Outlook.");
}
