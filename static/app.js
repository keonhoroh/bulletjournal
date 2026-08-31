const ratingInput = document.getElementById("rating");
const ratingOutput = document.getElementById("rating-output");
const highlightInput = document.getElementById("highlight");
const entryDateInput = document.getElementById("entry-date");
let allEntries = [];

// can't log a day that hasn't happened yet
entryDateInput.max = getTodayDateString();
entryDateInput.value = getTodayDateString();

const ratingDial = document.getElementById("rating-dial");
const ratingArc = document.getElementById("rating-arc");

const DIAL_RADIUS = 70;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;
ratingArc.style.strokeDasharray = DIAL_CIRCUMFERENCE;

// clamps/rounds a rating value and updates both the dial's fill and the hidden input
function setRating(value) {
  value = Math.min(10, Math.max(0, value));
  value = Math.round(value * 10) / 10;

  const percent = value / 10;
  ratingArc.style.strokeDashoffset = DIAL_CIRCUMFERENCE * (1 - percent);

  ratingInput.value = value;
  ratingOutput.textContent = value;
}

// converts a pointer's screen position into an angle (degrees) around the dial's center
function angleFromCenter(clientX, clientY) {
  const rect = ratingDial.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = clientX - centerX;
  const dy = clientY - centerY;

  // atan2 measures clockwise from the 3 o'clock position; +90 shifts
  // the reference point to 12 o'clock, where our dial starts at 0.
  let angleDegrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  if (angleDegrees < 0) angleDegrees += 360;

  return angleDegrees;
}

// converts an angle straight into a 0-10 rating; only used for the initial click position
function angleToRating(clientX, clientY) {
  return (angleFromCenter(clientX, clientY) / 360) * 10;
}

let draggingRating = false;
let lastAngle = null;

// starts a drag on the dial and jumps the rating to wherever the click landed
ratingDial.addEventListener("pointerdown", function (event) {
  draggingRating = true;
  lastAngle = angleFromCenter(event.clientX, event.clientY);
  setRating(angleToRating(event.clientX, event.clientY));
});

// while dragging, advances the rating by the angle moved since the last frame
document.addEventListener("pointermove", function (event) {
  if (!draggingRating) return;

  const angle = angleFromCenter(event.clientX, event.clientY);
  let delta = angle - lastAngle;

  // a jump bigger than half a turn almost certainly means we crossed
  // the 0/360 seam, not that the mouse really leapt most of the way
  // around the circle in one frame
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  setRating(parseFloat(ratingInput.value) + (delta / 360) * 10);
  lastAngle = angle;
});

document.addEventListener("pointerup", function () {
  draggingRating = false;
});

setRating(parseFloat(ratingInput.value));

const habitCheckboxes = document.querySelectorAll(".habit-row input[type='checkbox']");
const habitProgressBar = document.getElementById("habit-progress-bar");
const habitProgressLabel = document.getElementById("habit-progress-label");

// recounts checked habits and updates the progress bar's width + "x/5" label
function updateHabitProgress() {
  const total = habitCheckboxes.length;

  const checked = Array.from(habitCheckboxes).filter(checkbox => checkbox.checked).length;

  const percent = total === 0 ? 0 : (checked / total) * 100;

  habitProgressBar.style.width = `${percent}%`;
  habitProgressLabel.textContent = `${checked}/${total}`;
}

habitCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const row = checkbox.closest(".habit-row");
    row.classList.toggle("checked", checkbox.checked);
    updateHabitProgress();
  });
});

updateHabitProgress();

// maps a rating to a calendar-cell background shade using the locked indigo scale
function ratingToColorClass(rating) {
  if (rating === undefined) {
    return "bg-gray-100";
  } else if (rating < 2) {
    return "bg-indigo-100";
  } else if (rating < 4) {
    return "bg-indigo-200";
  } else if (rating < 6) {
    return "bg-indigo-400";
  } else if (rating < 8) {
    return "bg-indigo-600";
  } else {
    return "bg-indigo-800";
  }
}

// indigo-600 and indigo-800 are dark enough that gray text stops being
// readable, so those two ratings get white text instead
function ratingToTextClass(rating) {
  if (rating !== undefined && rating >= 6) {
    return "text-white";
  }
  return "text-gray-600";
}

const entryModal = document.getElementById("entry-modal");
const entryModalDate = document.getElementById("entry-modal-date");
const entryModalHighlight = document.getElementById("entry-modal-highlight");
const entryModalRating = document.getElementById("entry-modal-rating");
const entryModalHabits = document.getElementById("entry-modal-habits");
const entryModalClose = document.getElementById("entry-modal-close");

// fills in and reveals the day-detail popup for a given entry
function openEntryModal(entry) {
  entryModalDate.textContent = entry.date;
  entryModalHighlight.textContent = entry.highlight;
  entryModalRating.textContent = entry.rating;

  entryModalHabits.innerHTML = "";
  entry.habits.forEach(function (habit) {
    const item = document.createElement("li");
    item.textContent = `✓ ${habit}`;
    entryModalHabits.appendChild(item);
  });

  entryModal.classList.remove("hidden");
}

function closeEntryModal() {
  entryModal.classList.add("hidden");
}

entryModalClose.addEventListener("click", closeEntryModal);

// closes on a backdrop click, but not on a click inside the card itself
entryModal.addEventListener("click", function (event) {
  if (event.target === entryModal) closeEntryModal();
});

// builds the current month's grid: blank cells to align the 1st on its real
// weekday, then one shaded, clickable cell per day
function renderRatingsCalendar(entries) {
  const entriesByDate = {};

  entries.forEach(function (entry) {
    entriesByDate[entry.date] = entry;
  });

  const calendar = document.getElementById("ratings-calendar");
  calendar.innerHTML = "";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // which weekday (0 = Sunday) the 1st of this month falls on
  const firstWeekday = new Date(year, month, 1).getDay();
  // "day 0" of next month rolls back to the last real day of this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstWeekday; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const entry = entriesByDate[dateString];

    const cell = document.createElement("div");
    cell.className = `aspect-square rounded flex items-center justify-center text-[10px] font-medium ${ratingToColorClass(entry ? entry.rating : undefined)} ${ratingToTextClass(entry ? entry.rating : undefined)}`;
    cell.textContent = day;
    cell.title = entry ? `${dateString}: ${entry.rating}` : dateString;

    // only days with a real entry are clickable
    if (entry) {
      cell.classList.add("cursor-pointer");
      cell.addEventListener("click", function () {
        openEntryModal(entry);
      });
    }

    calendar.appendChild(cell);
  }
}

const submitButton = document.querySelector("#journal-form button[type='submit']");
const entryLockedMessage = document.getElementById("entry-locked-message");

// disables/enables the whole entry form; used to lock it once the picked
// date already has a saved (and therefore immutable) entry
function setFormLocked(locked) {
  highlightInput.disabled = locked;
  submitButton.disabled = locked;
  entryLockedMessage.classList.toggle("hidden", !locked);

  // pointer-events-none stops pointerdown from ever firing on the dial,
  // so no extra JS flag is needed to block dragging while locked
  ratingDial.classList.toggle("pointer-events-none", locked);
  ratingDial.classList.toggle("opacity-50", locked);

  habitCheckboxes.forEach(function (checkbox) {
    checkbox.disabled = locked;
  });
}

// fills the form with a date's saved entry if one exists, and locks it so it can't be resubmitted
function loadFormForDate(dateString) {
  const entry = allEntries.find(function (e) {
    return e.date === dateString;
  });

  highlightInput.value = entry ? entry.highlight : "";
  setRating(entry ? entry.rating : 0);

  habitCheckboxes.forEach(function (checkbox) {
    const label = checkbox.closest(".habit-row").querySelector("label");
    checkbox.checked = entry ? entry.habits.includes(label.textContent) : false;
    checkbox.dispatchEvent(new Event("change"));
  });

  setFormLocked(!!entry);
}

// fetches this user's entries from the API and re-renders the form + calendar from that data
async function loadEntries() {
  const response = await fetch("/api/entries");
  const entries = await response.json();

  allEntries = entries;
  loadFormForDate(entryDateInput.value);

  renderRatingsCalendar(entries);
}

loadEntries();

entryDateInput.addEventListener("change", function () {
  loadFormForDate(entryDateInput.value);
});

// builds today's date as "YYYY-MM-DD" in the browser's local timezone
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0"); 

  return `${year}-${month}-${day}`;
}

const journalForm = document.getElementById("journal-form");

// collects the form's current values and POSTs a new entry, then reloads everything
journalForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const habits = [];
  habitCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const label = checkbox.closest(".habit-row").querySelector("label");
      habits.push(label.textContent);
    }
  });

  const newEntry = {
    date: entryDateInput.value,
    highlight: highlightInput.value,
    rating: parseFloat(ratingInput.value),
    habits: habits,
  };

  await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });

  await loadEntries();
});
