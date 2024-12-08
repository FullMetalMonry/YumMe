// Данные для каждого этапа
const steps = [
    {
      title: 'Выбери основу',
      options: [
        { id: 'brownie', name: 'Брауни', price: 500, image: 'brownie.png' },
        { id: 'roll', name: 'Ролл', price: 600, image: 'roll.png' },
        { id: 'pancake', name: 'Панкейки', price: 700, image: 'pancakes.png' },
        { id: 'cookie', name: 'Печенье', price: 400, image: 'cookie.png' },
      ],
    },
    {
      title: 'Выбери начинку',
      options: [
        { id: 'marshmallow', name: 'Маршмеллоу', price: 300, image: 'marshmallow.png' },
        { id: 'cream', name: 'Крем', price: 350, image: 'cream.png' },
        { id: 'nuts', name: 'Орехи', price: 400, image: 'nuts.png' },
        { id: 'apple', name: 'Яблоки', price: 300, image: 'apple.png' },
      ],
    },
    {
      title: 'Выбери топпинг',
      options: [
        { id: 'caramel', name: 'Карамель', price: 200, image: 'caramel.png' },
        { id: 'strawberry', name: 'Клубника', price: 250, image: 'strawberry.png' },
        { id: 'chocolate', name: 'Шоколад', price: 300, image: 'chocolate.png' },
        { id: 'vanilla', name: 'Ваниль', price: 200, image: 'vanilla.png' },
      ],
    },
    {
      title: 'Выбери декор',
      options: [
        { id: 'sprinkles', name: 'Посыпка', price: 150, image: 'sprinkles.png' },
        { id: 'fruit', name: 'Фрукты', price: 250, image: 'fruit.png' },
        { id: 'cupcake', name: 'Капкейк', price: 300, image: 'cupcake.png' },
        { id: 'meringue', name: 'Безе', price: 200, image: 'meringue.png' },
      ],
    },
  ];
  
  let selectedOptions = [];
  let currentStep = 0;
  
  const titleElement = document.getElementById('title');
  const optionsContainer = document.getElementById('options');
  const nextStepButton = document.getElementById('next-step');
  const finalStepContainer = document.getElementById('final-step');
  const dessertNameElement = document.getElementById('dessert-name');
  const ingredientsListElement = document.getElementById('ingredients-list');
  const dessertPriceElement = document.getElementById('dessert-price');
  const addToCartButton = document.getElementById('add-to-cart');
  
  // Генерация имени десерта
  const generateDessertName = () => {
    const adjectives = ['Сладкий', 'Восхитительный', 'Чудесный', 'Нежный', 'Экзотический'];
    const bases = selectedOptions.map((option) => option.name);
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    return `${adjective} ${bases.join(' с ')}`;
  };
  
  // Рассчёт цены
  const calculatePrice = () => {
    return selectedOptions.reduce((total, option) => total + (option.price || 0), 0);
  };
  
  // Отображение текущего этапа
  const renderStep = () => {
    const step = steps[currentStep];
    titleElement.textContent = step.title;
    optionsContainer.innerHTML = '';
  
    step.options.forEach((option) => {
      const optionElement = document.createElement('div');
      optionElement.className =
        'flex flex-col items-center bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-100';
      optionElement.innerHTML = `
        <img src="${option.image}" alt="${option.name}" class="w-16 h-16 mb-2 rounded-lg">
        <span class="text-sm font-semibold text-gray-800">${option.name}</span>
      `;
      optionElement.addEventListener('click', () => {
        selectedOptions[currentStep] = option;
        Array.from(optionsContainer.children).forEach((child) =>
          child.classList.remove('border-blue-500', 'border-2')
        );
        optionElement.classList.add('border-blue-500', 'border-2');
      });
  
      optionsContainer.appendChild(optionElement);
    });
  };
  
  // Итоговый этап
  const renderFinalStep = () => {
    const dessertName = generateDessertName();
    const dessertPrice = calculatePrice();
    titleElement.textContent = 'Ваш десерт готов!';
    optionsContainer.classList.add('hidden');
    finalStepContainer.classList.remove('hidden');
  
    dessertNameElement.textContent = dessertName;
    dessertPriceElement.textContent = `Примерная цена: ₸${dessertPrice}`;
    ingredientsListElement.innerHTML = selectedOptions
      .map(
        (option) => `
      <div class="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
        <img src="${option.image}" alt="${option.name}" class="w-20 h-20 mb-2 rounded-lg">
        <span class="text-sm font-semibold text-gray-800">${option.name}</span>
      </div>
    `
      )
      .join('');
  
    addToCartButton.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({
        id: Date.now(),
        name: dessertName,
        price: dessertPrice,
        ingredients: selectedOptions,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`Десерт "${dessertName}" добавлен в корзину!`);
      window.location.href = 'cart.html';
    });
  };

  const goBack = () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    } else {
      alert('Вы на первом шаге!');
    }
  };
  
  // Добавляем обработчик для кнопки "Назад"
  document.getElementById('back-button').addEventListener('click', goBack);



  
  // Кнопка "Продолжить"
  nextStepButton.addEventListener('click', () => {
    if (!selectedOptions[currentStep]) {
      alert('Пожалуйста, выберите опцию!');
      return;
    }
    currentStep++;
    if (currentStep < steps.length) {
      renderStep();
    } else {
      renderFinalStep();
    }
  });
  
  // Инициализация
  renderStep();
  