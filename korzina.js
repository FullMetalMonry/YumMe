// Массив для корзины
const cart = [
    { id: 1, name: 'Клубничный трайфл', description: 'В баночке', price: 2000, quantity: 1 },
    { id: 2, name: 'Шоколадный десерт', description: '', price: 1500, quantity: 2 },
    { id: 3, name: 'Фисташковое пирожное', description: '', price: 1800, quantity: 1 },
  ];
  
  // Рендеринг товаров в корзине
  const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;
  
    cart.forEach((item) => {
      total += item.price * item.quantity;
  
      const row = document.createElement('tr');
      row.className = 'border-t';
  
      row.innerHTML = `
        <td class="px-4 py-2">
          <h2 class="text-lg font-semibold text-gray-800">${item.name}</h2>
          <p class="text-sm text-gray-600">${item.description}</p>
        </td>
        <td class="px-4 py-2 text-center">
          <input
            type="number"
            value="${item.quantity}"
            min="1"
            data-id="${item.id}"
            class="quantity-input w-16 border border-gray-300 rounded-lg text-center"
          >
        </td>
        <td class="px-4 py-2 text-center">
          <span class="text-lg font-bold text-gray-800">₸${item.price * item.quantity}</span>
        </td>
        <td class="px-4 py-2 text-center">
          <button class="delete-button text-sm text-red-500 hover:underline" data-id="${item.id}">Удалить</button>
        </td>
      `;
      cartItems.appendChild(row);
    });
  
    totalElement.textContent = `₸${total}`;
  };
  
  // Обновление количества
  const updateQuantity = (id, quantity) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      renderCart();
    }
  };
  
  // Удаление товара
  const deleteItem = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      renderCart();
    }
  };
  
  // Слушатели событий
  document.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
      const id = parseInt(event.target.dataset.id, 10);
      const quantity = parseInt(event.target.value, 10);
      if (quantity > 0) {
        updateQuantity(id, quantity);
      }
    }
  });
  
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      const id = parseInt(event.target.dataset.id, 10);
      deleteItem(id);
    }
  });
  
  // Рендеринг корзины при загрузке страницы
  renderCart();
  