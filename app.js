function copyObservation() {
  const title = document.getElementById("title").value;
  const standard = document.getElementById("standard").value;
  const location = document.getElementById("location").value;
  const action = document.getElementById("action").value;

  const text = `
🦺 Daily Safety Observation

Title: ${title}
Standard: ${standard}
Location: ${location}

Action Taken:
${action}
`;

  const output = document.getElementById("output");
  output.value = text.trim();

  output.select();
  navigator.clipboard.writeText(output.value);

  alert("Copied! Paste in WhatsApp or Outlook.");
}
