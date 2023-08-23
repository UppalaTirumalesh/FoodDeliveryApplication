const cartContainer = document.getElementById("cartContainer");
const subTotalValue = document.getElementById("subTotalValue");
const taxValue = document.getElementById("taxValue");
const grandTotalValue = document.getElementById("grandTotalValue");
const checkoutButton = document.getElementById("checkoutButton");
const goBackButton = document.getElementById("goBackButton");

// Cart items stored in session storage
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

function renderCartItems() {
  cartContainer.innerHTML = "";

  // Logging to debug
  console.log("cartItems type:", typeof cartItems);
  console.log("cartItems value:", cartItems);

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
    checkoutButton.style.display = "none";
  } else {
    const itemMap = new Map(); // Map to track unique items and their quantities

    cartItems.forEach((product) => {
      if (itemMap.has(product.product)) {
        // Item already exists, update quantity
        const existingItem = itemMap.get(product.product);
        existingItem.quantity += product.quantity;
      } else {
        // New item, add to map
        itemMap.set(product.product, { ...product });
      }
    });

    itemMap.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("cart-product");

      const thumbnailElement = document.createElement("img");
      thumbnailElement.classList.add("cart-product-thumbnail");
      thumbnailElement.src = product.image;
      thumbnailElement.alt = "Product Image";

      const detailsElement = document.createElement("div");
      detailsElement.classList.add("cart-product-details");

      const titleElement = document.createElement("h2");
      titleElement.innerText = product.product;

      const priceElement = document.createElement("h4");
      priceElement.classList.add("cart-product-price");
      priceElement.innerText = `Price: ${product.price}`;

      const quantityElement = document.createElement("input");
      quantityElement.value = product.quantity || 1;
      quantityElement.min = 1;
      quantityElement.classList.add("cart-product-quantity");

      const decreaseButton = document.createElement("button");
      decreaseButton.innerText = "-";
      decreaseButton.classList.add("cart-product-decrease");
      decreaseButton.addEventListener("click", () => {
        let newQuantity = Math.max(1, product.quantity - 1);
        updateQuantity(product, newQuantity);
      });

      const increaseButton = document.createElement("button");
      increaseButton.innerText = "+";
      increaseButton.classList.add("cart-product-increase");
      increaseButton.addEventListener("click", () => {
        let newQuantity = product.quantity + 1;
        updateQuantity(product, newQuantity);
      });

      const removeButton = document.createElement("button");
      removeButton.classList.add("cart-product-remove");
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => {
        removeFromCart(product);
      });

      detailsElement.appendChild(titleElement);
      detailsElement.appendChild(priceElement);
      detailsElement.appendChild(decreaseButton);
      detailsElement.appendChild(quantityElement);
      detailsElement.appendChild(increaseButton);
      detailsElement.appendChild(removeButton);

      productElement.appendChild(thumbnailElement);
      productElement.appendChild(detailsElement);

      cartContainer.appendChild(productElement);
    });

    calculateCartTotal();
    checkoutButton.style.display = "block";
  }
}

// Function to calculate cart total
function calculateCartTotal() {
  let subTotal = 0;
  cartItems.forEach((item) => {
    if (item.price) {
      const priceValue = parseFloat(item.price.replace("$", "").trim());
      if (!isNaN(priceValue)) {
        subTotal += priceValue * (item.quantity || 1);
      }
    }
  });

  const taxRate = 0.05;
  const tax = subTotal * taxRate;
  const grandTotal = subTotal + tax;

  subTotalValue.textContent = `$${subTotal.toFixed(2)}`;
  taxValue.textContent = `$${tax.toFixed(2)}`;
  grandTotalValue.textContent = `$${grandTotal.toFixed(2)}`;
  return { subTotal, tax, grandTotal };
}

// Function to update quantity of an item
function updateQuantity(product, newQuantity) {
  const foundProduct = cartItems.find(
    (item) => item.product === product.product
  );
  if (foundProduct) {
    foundProduct.quantity = newQuantity;
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
  }
}

// Function to remove an item from the cart
function removeFromCart(product) {
  cartItems = cartItems.filter((item) => item.product !== product.product);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

// Load cart items on page load
window.addEventListener("DOMContentLoaded", () => {
  renderCartItems();

  goBackButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  checkoutButton.addEventListener("click", () => {
    const { subTotal, tax, grandTotal } = calculateCartTotal();
    const cartSummary = { subTotal, tax, grandTotal };
    cartItems.push(cartSummary);

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
    window.location.href = "./billing.html";
  });
  
});
