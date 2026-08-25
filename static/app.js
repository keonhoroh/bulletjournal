const ratingInput = document.getElementById("rating");
const ratingOutput = document.getElementById("rating-output");
const highlightInput = document.getElementById("highlight");

const ratingDial = document.getElementById("rating-dial");
const ratingArc = document.getElementById("rating-arc");

const DIAL_RADIUS = 70;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;
ratingArc.style.strokeDasharray = DIAL_CIRCUMFERENCE;

function setRating(value) {
  value = Math.min(10, Math.max(0, value));
  value = Math.round(value * 10) / 10;

  const percent = value / 10;
  ratingArc.style.strokeDashoffset = DIAL_CIRCUMFERENCE * (1 - percent);

  ratingInput.value = value;
  ratingOutput.textContent = value;
}

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

function angleToRating(clientX, clientY) {
  return (angleFromCenter(clientX, clientY) / 360) * 10;
}

let draggingRating = false;
let lastAngle = null;

ratingDial.addEventListener("pointerdown", function (event) {
  draggingRating = true;
  lastAngle = angleFromCenter(event.clientX, event.clientY);
  setRating(angleToRating(event.clientX, event.clientY));
});

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

function updateHabitProgress() {
  const total = habitCheckboxes.length;

  // TODO(you): count how many checkboxes in habitCheckboxes are currently
  // checked. habitCheckboxes is a NodeList, so you can turn it into a real
  // array with Array.from(habitCheckboxes) and then use an array method to
  // count how many have .checked === true.
  const checked = Array.from(habitCheckboxes).filter(checkbox => checkbox.checked).length;

  // TODO(you): turn `checked` and `total` into a percentage (0-100).
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

function renderRatingsChart(entries) {
  const chart = document.getElementById("ratings-chart");
  chart.innerHTML = "";

  const sorted = [...entries].sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  sorted.forEach(function (entry) {
    const bar = document.createElement("div");
    bar.className = "flex-1 min-w-[8px] bg-indigo-400 rounded-t hover:bg-indigo-600 transition-colors";
    bar.style.height = `${entry.rating * 10}%`;
    bar.title = `${entry.date}: ${entry.rating}`;
    chart.appendChild(bar);
  });
}

async function loadEntries() {
  const list = document.getElementById("entries-list");
  list.innerHTML = '<li class="text-sm text-gray-400">loading entries...</li>';

  const response = await fetch("/api/entries");
  const entries = await response.json();

  renderRatingsChart(entries);

  list.innerHTML = "";

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.className = "bg-white rounded-lg shadow-sm px-4 py-3 text-sm text-gray-400";
    empty.textContent = "no recorded entries yet";
    list.appendChild(empty);
    return;
  }

  entries.forEach(function (entry) {
    const item = document.createElement("li");
    item.className = "bg-white rounded-lg shadow-sm px-4 py-3 text-sm flex items-center justify-between gap-3";

    const text = document.createElement("span");
    text.textContent = `${entry.date}: ${entry.highlight} (${entry.rating})`;
    item.appendChild(text);

    const buttons = document.createElement("div");
    buttons.className = "flex gap-3 shrink-0";

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.className = "text-indigo-600 hover:text-indigo-800 text-xs font-medium";
    editButton.addEventListener("click", async function () {
      const newHighlight = prompt("edit highlight:", entry.highlight);
      if (newHighlight === null) return;
      const newRating = prompt("edit rating (0-10):", entry.rating);
      if (newRating === null) return;

      await fetch(`/api/entries/${entry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: entry.date,
          highlight: newHighlight,
          rating: parseFloat(newRating),
          habits: entry.habits,
        }),
      });
      await loadEntries();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "text-red-500 hover:text-red-700 text-xs font-medium";
    deleteButton.addEventListener("click", async function () {
      if (!confirm("delete this entry?")) return;
      
      await fetch(`/api/entries/${entry.id}`, {
        method: "DELETE",
      });
      await loadEntries();
    });

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    item.appendChild(buttons);

    list.appendChild(item);
  });
}

loadEntries();

const journalForm = document.getElementById("journal-form");

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
    date: "2026-08-11",
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
