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
    "🍳 08:30 – Breakfast",
    "🏋️ 09:00–09:45 – Workout (or just a walk :)",
    "🍱 12:30 – Lunch",
    "🍲 18:00 – Dinner",
    "🍎 21:00 – Light snack",
    "🛌 00:30–08:30 – Sleep",
  ],
  wednesday: [
    "🍳 05:30 – Breakfast (before work)",
    "🍱 12:00 – Lunch (during work break)",
    "🏋️ 16:00–16:45 – Workout (after work)",
    "🍲 19:30 – Dinner",
    "🛌 22:00–05:30 – Sleep",
  ],
  thursday: [
    "🍳 07:30 – Breakfast",
    "🏋️ 08:00–08:45 – Workout",
    "🍎 09:30 – Light snack (before work)",
    "🍱 14:00 – Lunch (during work break)",
    "🍲 19:30 – Dinner",
    "🛌 23:30–07:30 – Sleep",
  ],
  friday: [
    "🍳 15:30 – Light breakfast (after waking up)",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:00–15:00 – Sleep",
  ],
  saturday: [
    "🍳 15:30 – Light breakfast (after waking up)",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:00–15:00 – Sleep",
  ],
  sunday: [
    "🍱 12:30 – Lunch (before work)",
    "🍎 18:00 – Snack at work",
    "🍲 23:30 – Light dinner (after work)",
    "🛌 00:30–07:00 – Sleep",
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
  });
});

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