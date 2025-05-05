function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  return isNaN(id) ? null : id;
}

function renderProduct() {
  const id = getProductIdFromURL();
  const product = products.find(p => p.id === id);
  const container = document.getElementById("product-container");

  if (!product) {
    container.innerHTML = "<p style='color: #ccc;'>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="description">${product.description}</p>
      <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    </div>
  `;
}

function addToCart(product, price) {
  const cart = JSON.parse(localStorage.getItem('dropculture-cart')) || [];
  cart.push({ product, price });
  localStorage.setItem('dropculture-cart', JSON.stringify(cart));
  updateCartCounter(); // 🛒 Update live counter
  alert(`${product} added to cart.`);
}

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("dropculture-cart")) || [];
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = cart.length;
    counter.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduct();
  updateCartCounter();
});
