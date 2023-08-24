const cartContainer = document.getElementById("cartContainer");
const subTotalValue = document.getElementById("subTotalValue");
const taxValue = document.getElementById("taxValue");
const grandTotalValue = document.getElementById("grandTotalValue");
const checkoutButton = document.getElementById("checkoutButton");
const goBackButton = document.getElementById("goBackButton");
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

function renderCartItems() {
  cartContainer.innerHTML = "";

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
    checkoutButton.style.display = "none";
  } else {
    const itemMap = new Map();

    cartItems.forEach((product) => {
      if (itemMap.has(product.product)) {
        const existingItem = itemMap.get(product.product);
        existingItem.quantity += product.quantity;
      } else {
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

function removeFromCart(product) {
  cartItems = cartItems.filter((item) => item.product !== product.product);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

window.addEventListener("DOMContentLoaded", () => {
  renderCartItems();

  goBackButton.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  checkoutButton.addEventListener("click", () => {
    const { subTotal, tax, grandTotal } = calculateCartTotal();
    const cartSummary = { subTotal, tax, grandTotal };
    const orderSummary = { ...cartSummary, cartItems: [...cartItems] };
    sessionStorage.setItem("cartItems", JSON.stringify(orderSummary));
    console.log(cartItems);
    window.location.href = "./billing.html";
  });
  
});
