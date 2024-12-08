document.getElementById('add-to-cart').addEventListener('click', () => {
    const name = document.getElementById('item-name').value;
    const quantity = parseInt(document.getElementById('item-quantity').value, 10);
    const price = parseFloat(document.getElementById('item-price').value);
  
    if (!name || !price || quantity < 1) {
      alert('Заполните все поля корректно.');
      return;
    }
  
    const item = { name, quantity, price };
  
    // Сохранение в LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert('Товар добавлен в корзину!');
  });
  