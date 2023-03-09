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
              <i onclick="decrement(${item.id})" class="bi bi-bag-dash"></i>
              <div id="${item.id}" class="quantity">${itemQuantity ? itemQuantity:0}</div>
              <i onclick="increment(${item.id})" class="bi bi-bag-plus"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  results.innerHTML = html;
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartAmount = document.querySelector('.cartAmount');
  cartAmount.textContent = totalQuantity.toString();
}

function increment(id) {
  let quantity = parseInt(document.getElementById(id).textContent);
  quantity += 1;
  document.getElementById(id).textContent = quantity;
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const index = cartItems.findIndex(item => item.id === id);
  if (index === -1) {
    cartItems.push({ id, quantity });
  } else {
    cartItems[index].quantity += 1;
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
}

function decrement(id) {
  let quantity = parseInt(document.getElementById(id).textContent);
  if (quantity > 0) {
    quantity -= 1;
    document.getElementById(id).textContent = quantity;
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      cartItems[index].quantity -= 1;
      if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
  }
}
