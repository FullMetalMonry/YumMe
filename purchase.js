// Элементы DOM
const orderItemsContainer = document.getElementById('order-items');
const totalPriceElement = document.getElementById('total-price');
const deliveryPriceElement = document.getElementById('delivery-price');
const finalPriceElement = document.getElementById('final-price');
const payButton = document.getElementById('pay-button');

// Функция для отображения заказа
const renderOrder = () => {
  // Извлекаем данные корзины из localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  // Очищаем контейнер перед добавлением
  orderItemsContainer.innerHTML = '';

  // Рендеринг товаров
  cart.forEach((item, index) => {
    totalPrice += item.price || 0;

    const orderItem = document.createElement('div');
    orderItem.className = 'flex justify-between items-center bg-white rounded-lg shadow p-4 mb-4';
    orderItem.innerHTML = `
      <div class="flex items-center">
        <img src="desert.png" alt="${item.name}" class="w-16 h-16 rounded-lg mr-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">${item.name}</h2>
          <p class="text-sm text-gray-600">₸${item.price}</p>
        </div>
      </div>
      <button class="text-red-500 hover:underline remove-item" data-index="${index}">
        <img src="delete.png" alt="Удалить" class="w-6 h-6">
      </button>
    `;

    orderItemsContainer.appendChild(orderItem);
  });

  // Рассчитываем доставку (10% от стоимости)
  const deliveryPrice = Math.ceil(totalPrice * 0.1);
  const finalPrice = totalPrice + deliveryPrice;

  // Отображаем цены
  totalPriceElement.textContent = `₸${totalPrice}`;
  deliveryPriceElement.textContent = `₸${deliveryPrice}`;
  finalPriceElement.textContent = `₸${finalPrice}`;
};

// Обработка удаления товара
document.addEventListener('click', (event) => {
  if (event.target.closest('.remove-item')) {
    const index = event.target.closest('.remove-item').dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderOrder();
  }
});

// Обработка оплаты
payButton.addEventListener('click', () => {
  alert('Ваш заказ оформлен!');
  localStorage.removeItem('cart');
  window.location.href = 'success.html'; // Страница успешной оплаты
});

// Рендеринг страницы при загрузке
renderOrder();
