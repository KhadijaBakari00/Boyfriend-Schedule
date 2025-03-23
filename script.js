const scheduleDisplay = document.getElementById("schedule-display");
const dayButtons = document.querySelectorAll(".day-button");

// Updated schedules
const schedules = {
  monday: [
    "🍳 08:30 – Breakfast (before workout)",
    "🏋️ 09:00–09:45 – Workout",
    "🍱 12:30 – Lunch (before work)",
    "🍎 18:00 – Snack at work",
    "🍲 00:00 – Light dinner (after work, not too heavy before bed)",
    "🛌 00:30–08:30 – Sleep",
  ],
  tuesday: [
    "⏰ 08:30 – Wake up + Breakfast",
    "🏋️ 09:30–10:15 – Workout/ or just a walk:)",
    "🍱 13:00 – Lunch",
    "🍲 18:30 – Dinner",
    "🍎 21:00 – Light snack",
    "🛌 00:30–08:30 – Sleep",
  ],
  wednesday: [
    "🍳 08:30 – Breakfast (before workout)",
    "🏋️ 09:00–09:45 – Workout",
    "🍱 12:30 – Lunch (before work)",
    "🍎 18:00 – Snack at work",
    "🍲 00:00 – Light dinner (after work)",
    "🛌 00:30–08:30 – Sleep",
  ],
  thursday: [
    "⏰ 08:30 – Wake up + Breakfast",
    "🏋️ 12:30–13:15 – Workout",
    "🍱 14:00 – Lunch",
    "🛌 16:00–19:30 – Nap (to adjust for night shift)",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:00–15:00 – Sleep",
  ],
  friday: [
    "⏰ 15:00 – Wake up + Breakfast",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:00–15:00 – Sleep",
  ],
  saturday: [
    "⏰ 15:00 – Wake up + Breakfast",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:00–15:00 – Sleep",
  ],
  sunday: [
    "⏰ 15:00 – Wake up + Breakfast",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 19:30 – Dinner",
    "🍎 22:30 – Light snack",
    "🛌 01:00–09:00 – Sleep",
  ],
};

// Load schedule when a day is clicked
dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const day = button.getAttribute("data-day");
    const schedule = schedules[day];
    scheduleDisplay.innerHTML = `
      <h2>${day.charAt(0).toUpperCase() + day.slice(1)}</h2>
      <ul>
        ${schedule.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;

    // Add click event listeners to each list item
    const listItems = scheduleDisplay.querySelectorAll("li");
    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        const activity = item.textContent.split(" – ")[1]; // Extract the activity
        showPopup(activity); // Show the popup with a custom message
      });
    });
  });
});

// Function to show a custom modal
function showPopup(activity) {
  const modal = document.getElementById("custom-modal");
  const modalMessage = document.getElementById("modal-message");
  let message = "";

  // Custom messages based on the activity
  if (activity.includes("Workout")) {
    message = "Never back down, never what? Good luck bubu! 💪";
  } else if (activity.includes("Breakfast") || activity.includes("Lunch") || activity.includes("Dinner")) {
    message = "Go eat my Roro patootie, and don’t forget to drink water as wellllll! 💖";
  } else if (activity.includes("Sleep")) {
    message = "Time to rest, bubu. Sweet dreams! 😴";
  } else if (activity.includes("Nap")) {
    message = "Take a nap, bubu. You deserve it! 😴";
  } else {
    message = `I assume it's time for you to ${activity.toLowerCase()}. You've got this! 💖`;
  }

  // Set the message and show the modal
  modalMessage.textContent = message;
  modal.style.display = "flex"; // Show the modal

  // Close the modal when the close button is clicked
  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });

  // Close the modal when clicking outside the modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"; // Hide the modal
    }
  });
}

// Reminder Notifications
if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notifications enabled!");
    }
  });
}

function setReminder(time, message) {
  const now = new Date();
  const [hours, minutes] = time.split(":");
  const reminderTime = new Date();
  reminderTime.setHours(hours, minutes, 0);

  if (reminderTime > now) {
    const timeout = reminderTime - now;
    setTimeout(() => {
      new Notification("⏰ Reminder!", { body: message });
    }, timeout);
  }
}

// Set reminders for all events
function setRemindersForDay(day, schedule) {
  schedule.forEach((item) => {
    const [time, activity] = item.split(" – ");
    setReminder(time, activity);
  });
}

// Set reminders for each day
setRemindersForDay("monday", schedules.monday);
setRemindersForDay("tuesday", schedules.tuesday);
setRemindersForDay("wednesday", schedules.wednesday);
setRemindersForDay("thursday", schedules.thursday);
setRemindersForDay("friday", schedules.friday);
setRemindersForDay("saturday", schedules.saturday);
setRemindersForDay("sunday", schedules.sunday);
