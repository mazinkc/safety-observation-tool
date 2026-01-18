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
    "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhiQv_eosX_JRU8gKUIP6jms11x0odQOlei_s-K2gEaJL_C5EE2i_6DEoeYThn51lKdgjVQXURMGCPA-MLslglx2iiF_-UHT9wLtg1gjY9Eskl8VJybqPXw0W7S_qJR5ZpNEiZV8uj2U6LiL2K3Bh7-MQysGwdAPkPitMhPWVulyCkjztLAEPj1ZlVOBzHHd5r_eIKwN1R4odADWq5-aoR1w7Asy-GJTBkuKl9mmvT4prQeYXATqbEHfv5efaAaydMD0BBl2Ex2tkoN59Ww-K2WaAlPEw&lib=MKb_swMMWnJwt6aPDKhB61oNgOsbLQx5W";

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
