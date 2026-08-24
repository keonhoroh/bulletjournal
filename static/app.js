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
