// Initialize cartItems as an empty array if it's not in session storage
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

// Add event listener to all "ORDER NOW" buttons
const orderButtons = document.querySelectorAll(".orderbutton");
orderButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    const product = event.currentTarget.getAttribute("data-product");
    const price = event.currentTarget.getAttribute("data-price");
    const image = event.currentTarget.getAttribute("data-image");

    // Make sure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // Add the selected product to cart items
    cartItems.push({ product, price, image, quantity: 1 });

    // Store the updated cart items in session storage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Debug: Log the selected product data
    console.log("Selected Product:", { product, price, image });

    // Redirect to cart.html
    window.location.href = "cart.html";
  });
});
