const scheduleDisplay = document.getElementById("schedule-display");
const dayButtons = document.querySelectorAll(".day-button");

// Updated schedules
const schedules = {
  monday: [
    "🍳 08:30 – Breakfast (before workout)",
    "🏋️ 09:00–09:45 – Workout",
    "🍱 12:30 – Lunch (before work)",
    "🍎 18:00 – Snack at work",
    "🍲 00:30 – Light dinner (after work, not too heavy before bed)",
    "🛌 01:00–07:00 – Sleep",
  ],
  tuesday: [
    "⏰ 07:00 – Wake up",
    "🍳 07:30 – Breakfast",
    "🏋️ 08:00–08:45 – Workout (or just a walk)",
    "🍱 12:30 – Lunch",
    "🍲 18:00 – Dinner",
    "🍎 21:00 – Light snack",
    "🛌 22:30–05:30 – Sleep",
  ],
  wednesday: [
    "⏰ 05:30 – Wake up + Breakfast",
    "🍱 12:00 – Lunch (during work break)",
    "🏋️ 16:30–17:15 – Workout (after getting home)",
    "🍲 19:30 – Dinner",
    "🛌 22:30–06:30 – Sleep",
  ],
  thursday: [
    "⏰ 06:30 – Wake up",
    "🍳 07:00 – Breakfast",
    "🏋️ 08:00–08:45 – Workout",
    "🍎 09:30 – Light snack (before work)",
    "🍱 14:00 – Lunch (during work break)",
    "🍲 19:30 – Dinner (after getting home)",
    "🛌 00:30–08:30 – Sleep",
  ],
  friday: [
    "⏰ 08:30 – Wake up",
    "🍳 09:00 – Breakfast",
    "🏋️ 12:30–13:15 – Workout",
    "🛌 15:30 – Nap (to prepare for night shift)",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:30–15:30 – Sleep",
  ],
  saturday: [
    "⏰ 15:30 – Wake up + Breakfast",
    "🏋️ 16:00–16:45 – Workout",
    "🍲 20:30 – Dinner (before work)",
    "🍎 00:00 – Snack at work",
    "🛌 07:30–15:30 – Sleep",
  ],
  sunday: [
    "🍳 11:30 – Breakfast (before work)",
    "🍱 13:00 – Lunch (before work)",
    "🍎 18:00 – Snack at work",
    "🍲 00:00 – Light dinner (after work)",
    "🛌 00:30–07:30 – Sleep",
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
