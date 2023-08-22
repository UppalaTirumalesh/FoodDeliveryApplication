const progressBar = document.querySelector(".progress-bar");
const progressBarFill = document.querySelector(".progress-bar-fill");
const progressBubbles = document.querySelectorAll(".bubble");
const progressSteps = document.querySelector(".progress-steps");
const subTotalValue = document.getElementById("subTotalValue");
const taxValue = document.getElementById("taxValue");
const grandTotalValue = document.getElementById("grandTotalValue");

// Load price details from sessionStorage
function loadPriceDetails() {
  const subTotal = parseFloat(sessionStorage.getItem("subTotal")) || 0;
  const tax = parseFloat(sessionStorage.getItem("tax")) || 0;
  const grandTotal = parseFloat(sessionStorage.getItem("grandTotal")) || 0;

  subTotalValue.textContent = `$${subTotal.toFixed(2)}`;
  taxValue.textContent = `$${tax.toFixed(2)}`;
  grandTotalValue.textContent = `$${grandTotal.toFixed(2)}`;
}

function updateProgressBarAndBubbles(progressPercentage) {
  progressBarFill.style.height = `${progressPercentage}%`;

  const numBubbles = Math.ceil(progressPercentage / (100 / progressBubbles.length));
  for (let i = 0; i < progressBubbles.length; i++) {
    if (i < numBubbles) {
      progressBubbles[i].classList.add("active");
    } else {
      progressBubbles[i].classList.remove("active");
    }
  }
}

function simulateOrderTracking() {
  const numSteps = progressSteps.children.length;
  const intervalDuration = 3000;
  let progress = 0;

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
    }
    updateProgressBarAndBubbles(progress);
    progress += 100 / numSteps;
  }, intervalDuration);
}

// Run the simulation and load price details on page load
window.addEventListener("DOMContentLoaded", () => {
  simulateOrderTracking();
  loadPriceDetails();
});
