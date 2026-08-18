const ratingInput = document.getElementById("rating");
const ratingOutput = document.getElementById("rating-output");
const highlightInput = document.getElementById("highlight");

ratingInput.addEventListener("input", function () {
  ratingOutput.textContent = ratingInput.value;
});

const habitCheckboxes = document.querySelectorAll(".habit-row input[type='checkbox']");

habitCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const row = checkbox.closest(".habit-row");
    row.classList.toggle("checked", checkbox.checked);
  });
});

async function loadEntries() {
  const response = await fetch("/api/entries");
  const entries = await response.json();

  const list = document.getElementById("entries-list");
  list.innerHTML = "";
  entries.forEach(function (entry) {
    const item = document.createElement("li");
    item.className = "bg-white rounded-lg shadow-sm px-4 py-3 text-sm";
    item.textContent = `${entry.date}: ${entry.highlight} (${entry.rating})`;
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
