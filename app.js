const ratingInput = document.getElementById("rating");
const ratingOutput = document.getElementById("rating-output");

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
