window.addEventListener('beforeunload', () => {
  // eslint-disable-next-line no-undef
  localStorage.clear();
});

window.onload = function () {
  document.getElementById('submit').click();
};

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  fetch(`/search?q=${query}`)
    .then(response => response.json())
    .then(data => updateResults(data))
    .catch(error => console.error(error));
});

function updateResults (data) {
  let html = '';
  // eslint-disable-next-line no-lone-blocks
  { data.forEach(item => {
    // eslint-disable-next-line no-undef
    const itemQuantity = localStorage.getItem(`item-${item.id}`);
    html += `
      <div class="col-md-4">
        <div id="id-product-${item.id}" class="card">
        <!--image style are added here directly due to async issues--!>
          <img src="${item.image}" class="card-img-top" style="width:200px; height:auto; display:flex; overflow:hidden; object-fit:cover; margin-left: auto;margin-right: auto;" alt="Something went wrong here :(">
          <div class="card-body">
            <h5 class="card-title">${item.name} $${item.price}</h5>
            <p class="card-text">${item.type}</p>
            <div class="buttons">
              <i onclick="decrement(${item.id}, '${item.name}', ${item.price}, '${item.image}')" class="bi bi-bag-dash"></i>
              <div id="${item.id}" class="quantity">${itemQuantity || 0}</div>
              <i onclick="increment(${item.id}, '${item.name}', '${item.price}', '${item.image}')" class="bi bi-bag-plus"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  results.innerHTML = html;
if (html === '') {
  results.innerHTML = '<h1>The product you searched for is still unavailable, try something else!<h1>';
} }
}

function updateCartCount () {
  // eslint-disable-next-line no-undef
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartAmount = document.querySelector('.cartAmount');
  cartAmount.textContent = totalQuantity.toString();
}

// eslint-disable-next-line no-unused-vars
function increment (id, name, price, image) {
  console.log(id, name, price, image);
  let quantity = parseInt(document.getElementById(id).textContent);
  quantity += 1;
  document.getElementById(id).textContent = quantity;
  // eslint-disable-next-line no-undef
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const index = cartItems.findIndex(item => item.id === id);
  if (index === -1) {
    cartItems.push({ id, name, price, image, quantity });
  } else {
    cartItems[index].quantity += 1;
  }
  // eslint-disable-next-line no-undef
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
}

// eslint-disable-next-line no-unused-vars
function decrement (id, name, price, image) {
  let quantity = parseInt(document.getElementById(id).textContent);
  if (quantity > 0) {
    quantity -= 1;
    document.getElementById(id).textContent = quantity;
    // eslint-disable-next-line no-undef
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      cartItems[index].quantity -= 1;
      if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1);
      }
    }
    // eslint-disable-next-line no-undef
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
  }
}

const checkout = document.getElementById('checkout');

checkout.addEventListener('click', () => {
// eslint-disable-next-line no-undef
console.log(localStorage);
fetch('/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  // eslint-disable-next-line no-undef
  body: JSON.stringify(localStorage)
})
.catch(error => console.error(error));
});

// JavaScript code to fetch and display the data
const cartItemsGrid = document.getElementById('cart-items-grid');

// Fetch the data from the server using fetch()
checkout.addEventListener('click', () => {
  console.log('success');
  fetch('/getorders')
  .then(response => response.json())
  .then(data => updateCartPage(data))
  .catch(error => console.error(error));
});

function updateCartPage (data) {
  // eslint-disable-next-line no-undef
  console.log('cart data is here', localStorage.getItem('cartItems'));
  const html = '<p>We have received your products request! Thanks for shopping!</p>';
  cartItemsGrid.innerHTML = html;
};
