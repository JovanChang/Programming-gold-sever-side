let cart = [];

// Fetch products from JSON file
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Display products
    let productsElement = document.getElementById('products');
    products.forEach(function(product) {
      let productElement = document.createElement('div');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsElement.appendChild(productElement);
    });
  })
  .catch(error => console.error(error));

function addToCart(id) {
  // Find product by ID and add it to cart
  let product = products.find(product => product.id === id);
  cart.push(product);
  showCart();
}

function removeFromCart(id) {
  // Find product by ID and remove it from cart
  let index = cart.findIndex(product => product.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    showCart();
  }
}

function showCart() {
  let cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';

  if (cart.length === 0) {
    cartElement.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let cartList = document.createElement('ul');
    cart.forEach(function(product) {
      let cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <button onclick="removeFromCart(${product.id})">Remove</button>
      `;
      cartList.appendChild(cartItem);
    });
    cartElement.appendChild(cartList);
  }
}

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  fetch(`/search?q=${query}`)
    .then(response => response.json())
    .then(data => updateResults(data));
});

function updateResults(data) {
  let html = '';
  data.forEach(item => {
    html += `
      <div class="col-md-4">
        <div class="card">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name},$${item.price}</h5>
            <p class="card-text">${item.type}</p>
          </div>
        </div>
      </div>
    `;
  });
  results.innerHTML = html;
}