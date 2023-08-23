let progressBar = document.querySelector(".progress-bar");
let progressBarFill = document.querySelector(".progress-bar-fill");
let progressBubbles = document.querySelectorAll(".bubble");
let progressSteps = document.querySelector(".progress-steps");
let subTotalValue = document.getElementById("subTotalValue");
let taxValue = document.getElementById("taxValue");
let grandTotalValue = document.getElementById("grandTotalValue");
let goToShoppingButton = document.getElementById("goToShoppingButton");

// Load price details from sessionStorage
function loadPriceDetails() {

let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

// Use the values in your page rendering
const subTotal = cartItems[cartItems.length - 1].subTotal;
const tax = cartItems[cartItems.length - 1].tax;
const grandTotal = cartItems[cartItems.length - 1].grandTotal;

  subTotalValue.textContent = `$${subTotal}`;
  taxValue.textContent = `$${tax}`;
  grandTotalValue.textContent = `$${grandTotal}`;
}


function updateProgressBarAndBubbles(progressPercentage) {
  progressBarFill.style.height = `${progressPercentage}%`;

  let numBubbles = Math.ceil(progressPercentage / (100 / progressBubbles.length));
  for (let i = 0; i < progressBubbles.length; i++) {
    if (i < numBubbles) {
      progressBubbles[i].classList.add("active");
    } else {
      progressBubbles[i].classList.remove("active");
    }
  }
}

function simulateOrderTracking() {
  let numSteps = progressSteps.children.length;
  let intervalDuration = 3000;
  let progress = 0;

  let interval = setInterval(() => {
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

goToShoppingButton.addEventListener("click", () => {
  sessionStorage.removeItem("cartItems");
  window.location.href = "./index.html";
});
