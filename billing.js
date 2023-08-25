let orderSummary = JSON.parse(sessionStorage.getItem("orderSummary"));
let cartItems = orderSummary.cartItems;
let stateSelect = document.getElementById("states");
let districtSelect = document.getElementById("districts");
let goBackButton = document.getElementById("goBackButton");
let modal = document.getElementById("modal");
let modal2 = document.getElementById("modal2");
let closeModal = document.getElementsByClassName("close")[0];
let goToShoppingButton = document.getElementById("goToShoppingButton");
let placeOrderButton = document.getElementById("placeOrderButton");
let creditCardAndDebitCard = document.getElementById("creditCardAndDebitCard");
let paymentCards = document.getElementById("paymentCards");
let confirmButton1 = document.getElementById("confirm1");
let confirmButton2 = document.getElementById("confirm2");
let confirmButton3 = document.getElementById("confirm3");
let billingContainer = document.getElementById("billingContainer");
let paymentContainer = document.getElementById("paymentContainer");
let confirmationContainer = document.getElementById("confirmationContainer");
let orderConfirmationPageContainer = document.getElementById(
  "orderConfirmationPageContainer"
);
let progress = document.querySelector(".progress");
let googlepay = document.getElementById("googlepay");
let phonepay = document.getElementById("phonepay");
let paytm = document.getElementById("paytm");
let cashOnDelivery = document.getElementById("cashOnDelivery");
let checkboxProgressBar = document.getElementById("checkboxProgressBar");
let backButton = document.getElementsByClassName("backButton");
let backButton3 = document.getElementById("backButton3");
let yesValue = document.getElementById("yesValue");
let noValue = document.getElementById("noValue");

cashOnDelivery.addEventListener("click", () => {
  if (cashOnDelivery.checked) {
    confirmButton2.style.display = "block";
    backButton[0].style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton2.style.display = "none";
  }
});

googlepay.addEventListener("click", () => {
  if (googlepay.checked) {
    confirmButton2.style.display = "block";
    backButton[0].style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton2.style.display = "none";
  }
});

phonepay.addEventListener("click", () => {
  if (phonepay.checked) {
    confirmButton2.style.display = "block";
    backButton[0].style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton2.style.display = "none";
  }
});

paytm.addEventListener("click", () => {
  if (paytm.checked) {
    confirmButton2.style.display = "block";
    backButton[0].style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton2.style.display = "none";
  }
});

backButton[0].addEventListener("click", () => {
  paymentContainer.style.display = "none";
  billingContainer.style.display = "block";
  updateProgressBar(0);
});

backButton[1].addEventListener("click", () => {
  paymentContainer.style.display = "none";
  billingContainer.style.display = "block";
  updateProgressBar(0);
});

backButton3.addEventListener("click", () => {
  confirmationContainer.style.display = "none";
  paymentContainer.style.display = "block";
  updateProgressBar(23);
});

confirmButton1.addEventListener("click", () => {
  if (validateForm()) {
    billingContainer.style.display = "none";
    paymentContainer.style.display = "block";
    confirmationContainer.style.display = "none";
    updateProgressBar(23);
  }
});

confirmButton2.addEventListener("click", () => {
  paymentContainer.style.display = "none";
  confirmationContainer.style.display = "block";
  orderConfirmationPageContainer.style.display = "block";
  updateProgressBar(47);
});

confirmButton3.addEventListener("click", () => {
  if (validateForm2()) {
    paymentContainer.style.display = "none";
    confirmationContainer.style.display = "block";
    updateProgressBar(47);
  }
});

checkboxProgressBar.addEventListener("change", () => {
  if (checkboxProgressBar.checked) {
    placeOrderButton.style.display = "block";
  } else {
    placeOrderButton.style.display = "none";
  }
});

stateSelect.addEventListener("change", () => {
  let selectedState = stateSelect.value;
  updateDistrictOptions(selectedState);
});

function updateDistrictOptions(selectedState) {
  districtSelect.innerHTML = "";

  if (selectedState === "Andhra Pradesh") {
    addDistrictOption("East Godavari");
    addDistrictOption("West Godavari");
    addDistrictOption("Chittoor");
    addDistrictOption("Nellore");
  } else if (selectedState === "Telangana") {
    addDistrictOption("Warangal");
    addDistrictOption("Nizamabad");
    addDistrictOption("Hyderabad");
    addDistrictOption("Adilabad");
  } else if (selectedState === "Tamil Nadu") {
    addDistrictOption("Coimbatore");
    addDistrictOption("Madurai");
    addDistrictOption("Kancheepuram");
    addDistrictOption("Kanyakumari");
  } else if (selectedState === "Karnataka") {
    addDistrictOption("Mysuru");
    addDistrictOption("Kolar");
    addDistrictOption("Chikkamagaluru");
    addDistrictOption("Bagalkote");
  }
}

function addDistrictOption(district) {
  let option = document.createElement("option");
  option.value = district;
  option.textContent = district;
  districtSelect.appendChild(option);
}

creditCardAndDebitCard.addEventListener("click", () => {
  if (creditCardAndDebitCard.checked) {
    paymentCards.style.display = "block";
    confirmButton2.style.display = "none";
    backButton[0].style.display = "none";
  } else {
    backButton[0].style.display = "block";
    paymentCards.style.display = "none";
  }
});

goBackButton.addEventListener("click", () => {
  window.location.href = "./cart.html";
});

closeModal.addEventListener("click", () => {
  closeModalFunction();
});

goToShoppingButton.addEventListener("click", () => {
  sessionStorage.removeItem("cartItems");
  closeModalFunction();
  window.location.href = "index.html";
});

placeOrderButton.addEventListener("click", () => {
  if (validateForm()) {
    showModal();
    updateProgressBar(75);
  }
});

function validateForm() {
  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let phone = document.getElementById("mobile").value.trim();
  let alternatemobile = document.getElementById("alternatemobile").value.trim();
  let email = document.getElementById("email").value.trim();
  let address = document.getElementById("adr").value.trim();
  let selectedState = stateSelect.value;
  let selectedDistrict = districtSelect.value;

  let nameRegex = /^[a-zA-Z\s]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^\d{10}$/;

  if (
    fname === "" ||
    lname === "" ||
    email === "" ||
    phone === "" ||
    alternatemobile === "" ||
    selectedState === "" ||
    selectedDistrict === ""
  ) {
    alert("Please fill in all the fields in Billing Address.");
    return false;
  }

  if (!fname.match(nameRegex)) {
    document.getElementById("fname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("fname").style.border = "1px solid #ccc";
  }

  if (!lname.match(nameRegex)) {
    document.getElementById("lname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("lname").style.border = "1px solid #ccc";
  }

  if (!phone.match(phoneRegex)) {
    document.getElementById("mobile").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("mobile").style.border = "1px solid #ccc";
  }

  if (!alternatemobile.match(phoneRegex)) {
    document.getElementById("alternatemobile").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("alternatemobile").style.border = "1px solid #ccc";
  }

  if (!email.match(emailRegex)) {
    document.getElementById("email").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("email").style.border = "1px solid #ccc";
  }

  if (address === "") {
    alert("Please enter your address.");
    return false;
  }

  if (selectedState === "") {
    alert("Please select a state.");
    return false;
  }

  if (selectedDistrict === "") {
    alert("Please select a district.");
    return false;
  }

  return true;
}

function validateForm2() {
  let cardName = document.getElementById("cname").value.trim();
  let cardNumber = document.getElementById("ccnum").value.trim();
  let cvvNumber = document.getElementById("cvv").value.trim();
  let expmonth = document.getElementById("expmonth").value.trim();

  let creditCardNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let creditCardNumberRegex = /\b\d{4}-\d{4}-\d{4}-\d{4}\b/;
  let creditCardCVVRegex = /^\d{3}$/;

  if (cardName === "" || cardNumber === "" || cvvNumber === "") {
    alert("Please fill in all the fields in Payment Details.");
    return false;
  }

  if (expmonth === "") {
    alert("Please enter your expected Month and Year.");
    return false;
  }

  if (!cardName.match(creditCardNameRegex)) {
    document.getElementById("cname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("cname").style.border = "1px solid #ccc";
  }

  if (!cardNumber.match(creditCardNumberRegex)) {
    document.getElementById("ccnum").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("ccnum").style.border = "1px solid #ccc";
  }

  if (!cvvNumber.match(creditCardCVVRegex)) {
    document.getElementById("cvv").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("cvv").style.border = "1px solid #ccc";
  }

  return true;
}

function placeOrder() {
  let billingAddress = getBillingAddress();
  let paymentMethod = getPaymentMethod();
  displayOrderSummary(billingAddress, paymentMethod);
}

function getBillingAddress() {
  let firstName = document.getElementById("fname").value.trim();
  let lastName = document.getElementById("lname").value.trim();
  let mobileNumber = document.getElementById("mobile").value.trim();
  let alternateMobileNumber = document
    .getElementById("alternatemobile")
    .value.trim();
  let email = document.getElementById("email").value.trim();
  let address = document.getElementById("adr").value.trim();
  let pincode = document.getElementById("pincode").value.trim();
  let state = stateSelect.value;
  let district = districtSelect.value;

  return {
    firstName,
    lastName,
    mobileNumber,
    alternateMobileNumber,
    email,
    address,
    pincode,
    state,
    district,
  };
}

function getPaymentMethod() {
  let paymentMethod = "";

  if (cashOnDelivery.checked) {
    paymentMethod = "Cash on Delivery";
  } else if (googlepay.checked) {
    paymentMethod = "Google Pay";
  } else if (phonepay.checked) {
    paymentMethod = "PhonePe";
  } else if (paytm.checked) {
    paymentMethod = "Paytm";
  } else if (creditCardAndDebitCard.checked) {
    paymentMethod = "Credit Card / Debit Card";
  }

  return paymentMethod;
}

function displayOrderSummary(billingAddress, paymentMethod) {
  orderConfirmationPageContainer.style.display = "none";

  let elements = document.getElementsByClassName("order-summary-container");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }

  let orderSummaryContainer = document.createElement("div");
  orderSummaryContainer.classList.add("order-summary-container");

  let orderSummaryHeading = document.createElement("h1");
  orderSummaryHeading.textContent = "Order Summary Page";

  let billingAddressHeading = document.createElement("h4");
  billingAddressHeading.textContent = "Billing Address";

  let billingAddressDetails = document.createElement("p");
  billingAddressDetails.innerHTML = `First Name : ${billingAddress.firstName}<br>
    Last Name : ${billingAddress.lastName}<br>
    Mobile Number : ${billingAddress.mobileNumber}<br>
    Alternate Mobile Number  : ${billingAddress.alternateMobileNumber}<br>
    Email Id : ${billingAddress.email}<br>
    Address : ${billingAddress.address}<br>
    Pincode : ${billingAddress.pincode}<br>
    State : ${billingAddress.state}<br>
    District : ${billingAddress.district}`;

  let paymentMethodHeading = document.createElement("h4");
  paymentMethodHeading.textContent = "Payment Method";

  let paymentMethodDetails = document.createElement("p");
  paymentMethodDetails.textContent = `Payment Method : ${paymentMethod}`;

  let orderItemsHeading = document.createElement("h4");
  orderItemsHeading.textContent = "Ordered Items";

  let orderItemsList = document.createElement("ul");
  orderItemsList.classList.add("order-items-list");

  cartItems.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.classList.add("order-item");
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.product}" class="order-item-thumbnail">
      <div class="order-item-details">
        <h4 class="order-item-title">${item.product}</h4>
        <h4 class="order-item-price">Price: ${item.price}</h4>
        <h4 class="order-item-quantity">Quantity: ${item.quantity}</h4>
      </div>
    `;
    orderItemsList.appendChild(listItem);
  });

  const subTotalValue = orderSummary.subTotal;
  const taxValue = orderSummary.tax.toFixed(2);
  const grandTotalValue = orderSummary.grandTotal;

  let subTotalElement = document.createElement("h4");
  subTotalElement.textContent = `Sub Total: $${subTotalValue}`;

  let taxElement = document.createElement("h4");
  taxElement.textContent = `Tax (5%): $${taxValue}`;

  let grandTotalElement = document.createElement("h4");
  grandTotalElement.textContent = `Grand Total: $${grandTotalValue}`;

  let editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "Edit";

  let placeOrder = document.createElement("button");
  placeOrder.classList.add("placeOrder");
  placeOrder.textContent = "Place Order";

  orderSummaryContainer.appendChild(orderSummaryHeading);
  orderSummaryContainer.appendChild(billingAddressHeading);
  orderSummaryContainer.appendChild(billingAddressDetails);
  orderSummaryContainer.appendChild(paymentMethodHeading);
  orderSummaryContainer.appendChild(paymentMethodDetails);
  orderSummaryContainer.appendChild(orderItemsHeading);
  orderSummaryContainer.appendChild(orderItemsList);
  orderSummaryContainer.appendChild(subTotalElement);
  orderSummaryContainer.appendChild(taxElement);
  orderSummaryContainer.appendChild(grandTotalElement);
  orderSummaryContainer.appendChild(placeOrder);
  orderSummaryContainer.appendChild(editButton);

  placeOrder.addEventListener("click", () => {
    window.location.href = "./orderTracking.html";
    updateProgressBar(100);
  });

  editButton.addEventListener("click", () => {
    billingContainer.style.display = "block";
    confirmationContainer.style.display = "none";
    orderSummaryContainer.style.display = "none";
    updateProgressBar(0);
  });

  confirmationContainer.style.display = "block";
  // confirmationContainer.innerHTML ="";

  confirmationContainer.appendChild(orderSummaryContainer);

  confirmationContainer.scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("DOMContentLoaded", () => {
  if (cartItems.length === 0) {
    window.location.href = "index.html";
  }
});

function updateProgressBar(percentage) {
  progress.style.width = `${percentage}%`;
}

function showModal() {
  modal.style.display = "block";
  yesValue.addEventListener("click", () => {
    if (yesValue.checked) {
      placeOrder();
      closeModalFunction();
      updateProgressBar(75);
    }
  });

  noValue.addEventListener("click", () => {
    if (noValue.checked) {
      closeModalFunction();
      updateProgressBar(47);
    }
  });
}

function showModal2() {
  modal2.style.display = "block";
}

function closeModalFunction() {
  modal.style.display = "none";
  updateProgressBar(47);
}
