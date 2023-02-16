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
