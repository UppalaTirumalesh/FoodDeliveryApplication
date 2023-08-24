let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

if (!Array.isArray(cartItems)) {
  cartItems = [];
}

const orderButtons = document.querySelectorAll(".orderbutton");
orderButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    const product = event.currentTarget.getAttribute("data-product");
    const price = event.currentTarget.getAttribute("data-price");
    const image = event.currentTarget.getAttribute("data-image");

    cartItems.push({ product, price, image, quantity: 1 });
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "cart.html";
  });
});
