const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price || 0;

    const cartItem = document.createElement('div');
    cartItem.className = 'flex justify-between items-center bg-white rounded-lg shadow p-4 mb-4';
    cartItem.innerHTML = `
      <div>
        <h2 class="text-lg font-semibold text-gray-800">${item.name}</h2>
        <p class="text-sm text-gray-600">Количество: ${item.quantity || 1}</p>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-gray-800">₸${item.price || 0}</p>
        <button class="text-sm text-red-500 hover:underline remove-item" data-index="${index}">Удалить</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = `₸${totalPrice}`;
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const index = event.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

renderCart();



const proceedButton = document.getElementById('proceed-button');
    proceedButton.addEventListener('click', () => {
      if (JSON.parse(localStorage.getItem('cart'))?.length > 0) {
        window.location.href = 'purchase.html';
      } else {
        alert('Ваша корзина пуста!');
      }
    });
